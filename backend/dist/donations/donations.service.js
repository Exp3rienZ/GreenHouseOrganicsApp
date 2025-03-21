"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const donation_entity_1 = require("./entities/donation.entity");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let DonationsService = class DonationsService {
    donationsRepository;
    configService;
    stripe;
    constructor(donationsRepository, configService) {
        this.donationsRepository = donationsRepository;
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2023-10-16',
        });
    }
    async createDonation(createDonationDto) {
        const { amount, userId, email } = createDonationDto;
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'eur',
            payment_method_types: ['card'],
            receipt_email: email,
            metadata: {
                userId,
            },
        });
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
    async handleStripeWebhook(event) {
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
};
exports.DonationsService = DonationsService;
exports.DonationsService = DonationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(donation_entity_1.Donation)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], DonationsService);
//# sourceMappingURL=donations.service.js.map