/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apinobat.arenap.ir',
                port: '',
                pathname: '/publicstaticfiles/PhysicianProfileImages/**',
            },
        ],
    },
}

const withNextIntl = require("next-intl/plugin")(
    "./i18n.ts"
)



module.exports = withNextIntl(nextConfig)
