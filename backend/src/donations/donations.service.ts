// backend/src/donations/donations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class DonationsService {
    private stripe: Stripe;

    constructor(
        @InjectRepository(Donation)
        private donationsRepository: Repository<Donation>,
        private configService: ConfigService,
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2023-10-16',
        });
    }

    async createDonation(createDonationDto: CreateDonationDto) {
        const { amount, userId, email } = createDonationDto;

        // Stripe-Zahlungs-Intent erstellen
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100, // Stripe verwendet Cents
            currency: 'eur',
            payment_method_types: ['card'],
            receipt_email: email,
            metadata: {
                userId,
            },
        });

        // Spende in der Datenbank speichern
        const donation = this.donationsRepository.create({
            amount,
            userId,
            email,
            status: 'PENDING',
            stripePaymentIntentId: paymentIntent.id,
        });

        await this.donationsRepository.save(donation);

        return {
            clientSecret: paymentIntent.client_secret,
            donationId: donation.id,
        };
    }

    async handleStripeWebhook(event: any) {
        const { type, data } = event;

        if (type === 'payment_intent.succeeded') {
            const paymentIntent = data.object;
            const donation = await this.donationsRepository.findOne({
                where: { stripePaymentIntentId: paymentIntent.id },
            });

            if (donation) {
                donation.status = 'COMPLETED';
                await this.donationsRepository.save(donation);
            }
        }

        return { received: true };
    }

    async getTotalDonations() {
        const result = await this.donationsRepository
            .createQueryBuilder('donation')
            .select('SUM(donation.amount)', 'total')
            .where('donation.status = :status', { status: 'COMPLETED' })
            .getRawOne();

        return {
            totalAmount: result.total || 0,
        };
    }
}