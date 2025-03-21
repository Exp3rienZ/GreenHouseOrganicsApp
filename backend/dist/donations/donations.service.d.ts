import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { ConfigService } from '@nestjs/config';
export declare class DonationsService {
    private donationsRepository;
    private configService;
    private stripe;
    constructor(donationsRepository: Repository<Donation>, configService: ConfigService);
    createDonation(createDonationDto: CreateDonationDto): Promise<{
        clientSecret: any;
        donationId: any;
    }>;
    handleStripeWebhook(event: any): Promise<{
        received: boolean;
    }>;
    getTotalDonations(): Promise<{
        totalAmount: any;
    }>;
}
