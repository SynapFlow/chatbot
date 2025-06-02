"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./prisma");
const bcryptjs_1 = require("bcryptjs");
async function main() {
    console.log('🌱 Starting database seed...');
    const adminUser = await prisma_1.prisma.user.upsert({
        where: { email: 'admin@chatbot-rag.com' },
        update: {},
        create: {
            email: 'admin@chatbot-rag.com',
            username: 'admin',
            passwordHash: (0, bcryptjs_1.hashSync)('admin123', 10),
            role: 'admin',
            isVerified: true,
        },
    });
    const demoUser = await prisma_1.prisma.user.upsert({
        where: { email: 'demo@chatbot-rag.com' },
        update: {},
        create: {
            email: 'demo@chatbot-rag.com',
            username: 'demo',
            passwordHash: (0, bcryptjs_1.hashSync)('demo123', 10),
            role: 'user',
            isVerified: true,
        },
    });
    const demoOrg = await prisma_1.prisma.organization.upsert({
        where: { slug: 'demo-org' },
        update: {},
        create: {
            name: 'Demo Organization',
            slug: 'demo-org',
            ownerId: demoUser.id,
            subscriptionTier: 'pro',
        },
    });
    const demoProject = await prisma_1.prisma.project.upsert({
        where: {
            organizationId_slug: {
                organizationId: demoOrg.id,
                slug: 'demo-chatbot',
            },
        },
        update: {},
        create: {
            organizationId: demoOrg.id,
            name: 'Demo Chatbot',
            slug: 'demo-chatbot',
            description: 'A demonstration chatbot project',
            widgetSettings: {
                theme: 'light',
                position: 'bottom-right',
                primaryColor: '#3B82F6',
                greetingMessage: 'Hello! How can I help you today?',
            },
        },
    });
    await prisma_1.prisma.source.create({
        data: {
            projectId: demoProject.id,
            type: 'website',
            name: 'Demo Website',
            config: {
                url: 'https://example.com',
                crawlDepth: 2,
                includePatterns: ['*'],
                excludePatterns: [],
            },
        },
    });
    await prisma_1.prisma.source.create({
        data: {
            projectId: demoProject.id,
            type: 'document',
            name: 'Demo Documents',
            config: {
                supportedFormats: ['pdf', 'docx', 'txt'],
            },
        },
    });
    console.log('✅ Database seed completed!');
    console.log({
        adminUser: { email: adminUser.email, password: 'admin123' },
        demoUser: { email: demoUser.email, password: 'demo123' },
        organization: demoOrg.slug,
        project: demoProject.slug,
    });
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map