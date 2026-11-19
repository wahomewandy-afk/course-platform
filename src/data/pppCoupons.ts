import { env } from "./env/server"

export const pppCoupons = [
  {
    stripeCouponId: env.STRIPE_PPP_50_COUPON_ID,
    discountPercentage: 0.5,
    countryCodes: [
      "AF", "AL", "DZ", "AO", "AM", "AZ", "BD", "BY", "BZ", "BJ",
      "BT", "BO", "BA", "BW", "BF", "BI", "KH", "CM", "CV", "CF",
      "TD", "KM", "CG", "CD", "CI", "CU", "DJ", "DM", "DO", "EC",
      "EG", "SV", "GQ", "ER", "SZ", "ET", "FJ", "GA", "GM", "GE",
      "GH", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "IN", "ID",
      "IR", "IQ", "JM", "JO", "KZ", "KE", "KI", "KP", "XK", "KG",
      "LA", "LB", "LS", "LR", "LY", "MG", "MW", "MV", "ML", "MH",
      "MR", "FM", "MD", "MN", "ME", "MA", "MZ", "MM", "NA", "NP",
      "NI", "NE", "NG", "MK", "PK", "PW", "PS", "PG", "PY", "PE",
      "PH", "RW", "WS", "ST", "SN", "RS", "SL", "SB", "SO", "ZA",
      "SS", "LK", "SD", "SR", "SY", "TJ", "TZ", "TH", "TL", "TG",
      "TO", "TN", "TM", "TV", "UG", "UA", "UZ", "VU", "VE", "VN",
      "YE", "ZM", "ZW",
    ],
  },
  {
    stripeCouponId: env.STRIPE_PPP_40_COUPON_ID,
    discountPercentage: 0.4,
    countryCodes: [
      "AR", "BR", "BG", "CN", "CO", "CR", "HR", "HU", "MY", "MU",
      "MX", "PA", "RO", "RU", "TR",
    ],
  },
  {
    stripeCouponId: env.STRIPE_PPP_30_COUPON_ID,
    discountPercentage: 0.3,
    countryCodes: [
      "CL", "CZ", "EE", "GR", "LV", "LT", "PL", "PT", "SK", "SI",
      "UY",
    ],
  },
  {
    stripeCouponId: env.STRIPE_PPP_20_COUPON_ID,
    discountPercentage: 0.2,
    countryCodes: [
      "BS", "BH", "BB", "CY", "IT", "JP", "KR", "KW", "MT", "OM",
      "SA", "ES", "TW", "AE",
    ],
  },
]
