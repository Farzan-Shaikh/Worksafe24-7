import LegalLayout from '../components/layout/LegalLayout'

/* Legal text below is the original content, unchanged. Styling comes from LegalLayout (.ws-prose .ws-legal). */
const ShippingDelivery = () => {
  return (
    <LegalLayout title="Shipping and Delivery" titleLines={["Shipping and","Delivery"]} path="/shipping-delivery">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">SHIPPING AND DELIVERY</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Any purchase will be considered an order once the full payment is received.
              </p>

              <p>
                Our payment gateway partner is Cashfree Payments and courtesy our partner we accept payments via netbanking, debit card, credit card and UPI.
              </p>

              <p>
                Our standard delivery time is 14-21 days. This delivery time assumes normal working conditions and can be longer in case of any unforeseen circumstances.
              </p>

              <p>
                We reserve the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s) to your source account.
              </p>
            </div>
    </LegalLayout>
  )
}

export default ShippingDelivery
