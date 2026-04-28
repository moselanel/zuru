"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  User,
  ShoppingCart,
  Package,
  UtensilsCrossed,
  Fuel,
  Ticket,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const categories = [
  { id: "all", name: "All Items", icon: Package },
  { id: "food", name: "Food & Drinks", icon: UtensilsCrossed },
  { id: "fuel", name: "Fuel", icon: Fuel },
  { id: "tickets", name: "Entry Tickets", icon: Ticket },
  { id: "gifts", name: "Gift Shop", icon: Gift },
]

const products = [
  { id: "1", name: "Day Pass - Adult", price: 150, category: "tickets", sku: "TKT-001" },
  { id: "2", name: "Day Pass - Child", price: 75, category: "tickets", sku: "TKT-002" },
  { id: "3", name: "Guided Tour", price: 350, category: "tickets", sku: "TKT-003" },
  { id: "4", name: "Coffee", price: 35, category: "food", sku: "FNB-001" },
  { id: "5", name: "Cappuccino", price: 42, category: "food", sku: "FNB-002" },
  { id: "6", name: "Sandwich", price: 65, category: "food", sku: "FNB-003" },
  { id: "7", name: "Burger & Chips", price: 125, category: "food", sku: "FNB-004" },
  { id: "8", name: "Soft Drink", price: 28, category: "food", sku: "FNB-005" },
  { id: "9", name: "Water Bottle", price: 18, category: "food", sku: "FNB-006" },
  { id: "10", name: "Petrol (per litre)", price: 24.5, category: "fuel", sku: "FUEL-001" },
  { id: "11", name: "Diesel (per litre)", price: 22.8, category: "fuel", sku: "FUEL-002" },
  { id: "12", name: "Safari Hat", price: 195, category: "gifts", sku: "GIFT-001" },
  { id: "13", name: "T-Shirt", price: 250, category: "gifts", sku: "GIFT-002" },
  { id: "14", name: "Postcard Pack", price: 45, category: "gifts", sku: "GIFT-003" },
  { id: "15", name: "Keyring", price: 65, category: "gifts", sku: "GIFT-004" },
  { id: "16", name: "Plush Animal", price: 180, category: "gifts", sku: "GIFT-005" },
]

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  sku: string
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [guestRoom, setGuestRoom] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = subtotal * 0.15
  const total = subtotal + vat

  const handlePayment = () => {
    // Process payment
    setShowPayment(false)
    setCart([])
    setGuestRoom("")
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Products Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search and Categories */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or scan barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border hover:bg-muted"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-card border rounded-xl p-4 text-left hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  {product.category === "food" && <UtensilsCrossed className="h-5 w-5 text-primary" />}
                  {product.category === "fuel" && <Fuel className="h-5 w-5 text-primary" />}
                  {product.category === "tickets" && <Ticket className="h-5 w-5 text-primary" />}
                  {product.category === "gifts" && <Gift className="h-5 w-5 text-primary" />}
                </div>
                <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{product.sku}</p>
                <p className="font-semibold text-primary mt-2">R{product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 flex flex-col bg-card border rounded-2xl overflow-hidden">
        {/* Cart Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="font-semibold">Current Sale</h2>
          </div>
          {cart.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
              Clear
            </Button>
          )}
        </div>

        {/* Guest/Room Assignment */}
        <div className="p-4 border-b">
          <Label className="text-sm text-muted-foreground">Charge to room (optional)</Label>
          <div className="relative mt-1.5">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Room number or guest name"
              value={guestRoom}
              onChange={(e) => setGuestRoom(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Cart is empty</p>
              <p className="text-sm">Add items to begin</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">R{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <p className="font-medium w-20 text-right">R{(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Cart Total */}
        <div className="border-t p-4 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT (15%)</span>
              <span>R{vat.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary">R{total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full h-12 text-lg gap-2"
            disabled={cart.length === 0}
            onClick={() => setShowPayment(true)}
          >
            <Receipt className="h-5 w-5" />
            Charge R{total.toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Payment</DialogTitle>
            <DialogDescription>Total amount: R{total.toFixed(2)}</DialogDescription>
          </DialogHeader>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <label
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                paymentMethod === "card" ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="card" />
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Card Payment</p>
                <p className="text-sm text-muted-foreground">Tap, insert, or swipe</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                paymentMethod === "cash" ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="cash" />
              <Banknote className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Cash</p>
                <p className="text-sm text-muted-foreground">Pay with cash</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                paymentMethod === "room" ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="room" />
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Charge to Room</p>
                <p className="text-sm text-muted-foreground">{guestRoom || "Enter room number"}</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                paymentMethod === "mobile" ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="mobile" />
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Mobile Payment</p>
                <p className="text-sm text-muted-foreground">SnapScan, Zapper</p>
              </div>
            </label>
          </RadioGroup>

          {paymentMethod === "cash" && (
            <div className="space-y-3">
              <Label>Amount Tendered</Label>
              <Input type="number" placeholder="0.00" />
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" className="bg-transparent" onClick={() => setShowPayment(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>Complete Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
