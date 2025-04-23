export const countries = [
  { name: "Nigeria", code: "NG", currency: "NGN" },
  { name: "United States", code: "US", currency: "USD" },
  { name: "United Kingdom", code: "GB", currency: "GBP" },
  { name: "Canada", code: "CA", currency: "CAD" },
  { name: "Australia", code: "AU", currency: "AUD" },
  { name: "Ghana", code: "GH", currency: "GHS" },
  { name: "Kenya", code: "KE", currency: "KES" },
  { name: "South Africa", code: "ZA", currency: "ZAR" },
  { name: "India", code: "IN", currency: "INR" },
  { name: "China", code: "CN", currency: "CNY" },
  { name: "Japan", code: "JP", currency: "JPY" },
  { name: "Germany", code: "DE", currency: "EUR" },
  { name: "France", code: "FR", currency: "EUR" },
  { name: "Brazil", code: "BR", currency: "BRL" },
  { name: "Mexico", code: "MX", currency: "MXN" },
  { name: "Egypt", code: "EG", currency: "EGP" },
  { name: "Saudi Arabia", code: "SA", currency: "SAR" },
  { name: "United Arab Emirates", code: "AE", currency: "AED" },
  { name: "Singapore", code: "SG", currency: "SGD" },
  { name: "New Zealand", code: "NZ", currency: "NZD" },
]

export const getCurrencySymbol = (currency: string) => {
  const symbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    EUR: "€",
    CAD: "C$",
    AUD: "A$",
    GHS: "GH₵",
    KES: "KSh",
    ZAR: "R",
    INR: "₹",
    CNY: "¥",
    JPY: "¥",
    BRL: "R$",
    MXN: "Mex$",
    EGP: "E£",
    SAR: "SR",
    AED: "د.إ",
    SGD: "S$",
    NZD: "NZ$",
  }

  return symbols[currency] || currency
}

export const getCountryByName = (name: string) => {
  return countries.find((country) => country.name === name) || countries[0]
}

export const getCountryCurrency = (countryName: string) => {
  const country = getCountryByName(countryName)
  return country.currency
}
