import ShippingForm from "../Components/shippingForm"

export default function ShippingInformationRegistration({user_compID}) {
    return (
        <>
          <ShippingForm user_compID={user_compID}/>
        </>
      
        )
}