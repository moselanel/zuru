"use client"
import { useState } from "react"
import Link from "next/link"
import {
  CreditCard,
  Building,
  Smartphone,
  ChevronLeft,
  Check,
  Shield,
  Lock,
  Calendar,
  Users,
  MapPin,
  Clock,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Sample booking data (in real app, this would come from context/state)
const bookingData = {
  type: "accommodation",
  item: {
    name: "Canyon Lodge & Spa",
    location: "Blyde River Canyon Nature Reserve",
    image: "/placeholder.svg?height=200&width=300",
  },
  checkIn: "2026-02-15",
  checkOut: "2026-02-17",
  nights: 2,
  guests: 2,
  pricePerNight: 2800,
  extras: [{ name: "Sunrise Game Drive", price: 850, quantity: 2 }],
}

export function CheckoutForm() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = bookingData.pricePerNight * bookingData.nights
  const extrasTotal = bookingData.extras.reduce((sum, extra) => sum + extra.price * extra.quantity, 0)
  const conservationLevy = 150
  const serviceFee = Math.round((subtotal + extrasTotal) * 0.05)
  const discount = promoApplied ? Math.round((subtotal + extrasTotal) * 0.1) : 0
  const total = subtotal + extrasTotal + conservationLevy + serviceFee - discount

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === "mtpa10") {
      setPromoApplied(true)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/accommodation"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to accommodation
      </Link>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[
          { num: 1, label: "Guest Details" },
          { num: 2, label: "Payment" },
          { num: 3, label: "Confirmation" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s.num ? <Check className="h-4 w-4" /> : s.num}
            </div>
            <span
              className={`ml-2 text-sm hidden sm:inline ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}
            >
              {s.label}
            </span>
            {i < 2 && <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${step > s.num ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <>
              {/* Guest Details */}
              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-serif text-xl font-bold mb-6">Guest Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter first name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter last name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+27 12 345 6789" className="mt-1.5" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="country">Country of Residence *</Label>
                    <Input id="country" placeholder="South Africa" className="mt-1.5" />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="font-semibold mb-4">Additional Guests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guest2FirstName">Guest 2 First Name</Label>
                    <Input id="guest2FirstName" placeholder="Enter first name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="guest2LastName">Guest 2 Last Name</Label>
                    <Input id="guest2LastName" placeholder="Enter last name" className="mt-1.5" />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-serif text-xl font-bold mb-6">Special Requests</h2>
                <textarea
                  placeholder="Any special requests or dietary requirements? Let us know..."
                  className="w-full h-24 px-4 py-3 border rounded-lg bg-background resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Special requests are subject to availability and may incur additional charges.
                </p>
              </div>

              <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                Continue to Payment
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Payment Method */}
              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-serif text-xl font-bold mb-6">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                  >
                    <RadioGroupItem value="card" />
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "eft" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                  >
                    <RadioGroupItem value="eft" />
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">EFT / Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">Direct bank payment</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "mobile" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                  >
                    <RadioGroupItem value="mobile" />
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Mobile Payment</p>
                      <p className="text-sm text-muted-foreground">SnapScan, Zapper, Apple Pay</p>
                    </div>
                  </label>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1.5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Enter name as it appears on card" className="mt-1.5" />
                    </div>
                  </div>
                )}

                {paymentMethod === "eft" && (
                  <div className="mt-6 bg-muted/50 rounded-xl p-4">
                    <p className="font-medium mb-2">Bank Details</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Bank: First National Bank</p>
                      <p>Account Name: MTPA Bookings</p>
                      <p>Account Number: 12345678901</p>
                      <p>Branch Code: 250655</p>
                      <p>Reference: Your booking number (provided after confirmation)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-serif text-xl font-bold mb-4">Promo Code</h2>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-10"
                      disabled={promoApplied}
                    />
                  </div>
                  <Button variant="outline" onClick={handlePromoApply} disabled={promoApplied || !promoCode}>
                    {promoApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-primary mt-2 flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    10% discount applied!
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">Try: MTPA10 for 10% off</p>
              </div>

              {/* Terms */}
              <div className="bg-card border rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Checkbox id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that my booking is subject to the cancellation policy of the property.
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="lg" onClick={() => setStep(1)} className="bg-transparent">
                  Back
                </Button>
                <Button size="lg" className="flex-1 gap-2" onClick={() => setStep(3)}>
                  <Lock className="h-4 w-4" />
                  Pay R{total.toLocaleString()}
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="bg-card border rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your booking. A confirmation email has been sent to your email address.
              </p>

              <div className="bg-muted/50 rounded-xl p-6 text-left mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Booking Reference</span>
                  <span className="font-mono font-bold text-lg">MTPA-2026-78294</span>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium">{bookingData.item.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in</span>
                    <span>15 Feb 2026, 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out</span>
                    <span>17 Feb 2026, 10:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid</span>
                    <span className="font-bold text-primary">R{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/account">View My Bookings</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href="/">Continue Exploring</Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                Need help? Contact us at bookings@mtpa.co.za or +27 13 759 5300
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-lg">
            <h2 className="font-serif text-xl font-bold mb-4">Booking Summary</h2>

            {/* Property Info */}
            <div className="flex gap-4 mb-4">
              <img
                src={bookingData.item.image || "/placeholder.svg"}
                alt={bookingData.item.name}
                className="w-24 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold">{bookingData.item.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {bookingData.item.location}
                </p>
              </div>
            </div>

            <Separator className="mb-4" />

            {/* Booking Details */}
            <div className="space-y-3 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {bookingData.checkIn} - {bookingData.checkOut}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{bookingData.nights} nights</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{bookingData.guests} guests</span>
              </div>
            </div>

            <Separator className="mb-4" />

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  R{bookingData.pricePerNight.toLocaleString()} x {bookingData.nights} nights
                </span>
                <span>R{subtotal.toLocaleString()}</span>
              </div>

              {bookingData.extras.map((extra) => (
                <div key={extra.name} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {extra.name} x {extra.quantity}
                  </span>
                  <span>R{(extra.price * extra.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Conservation levy</span>
                <span>R{conservationLevy.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>R{serviceFee.toLocaleString()}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-primary">
                  <span>Promo discount (10%)</span>
                  <span>-R{discount.toLocaleString()}</span>
                </div>
              )}

              <Separator className="my-2" />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">R{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Shield className="h-4 w-4" />
                <span>Secure booking - SSL encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="h-4 w-4" />
                <span>Free cancellation up to 48 hours before</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
