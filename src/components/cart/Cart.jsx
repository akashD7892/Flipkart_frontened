import axios from "axios";
// import Razorpay from 'razorpay'

import { Grid, Box, Typography, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";

//component
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";

const Container = styled(Grid) (({theme}) => ({
    padding: '30px 135px' ,
    [theme.breakpoints.down('md')]: {
        padding:'15px 0'
    }
}))
 

const Header = styled(Box)`
  padding: 15px 24px ;
  background:white;
`

const LeftComponent = styled(Grid) (({theme}) => ({
    paddingRight:15 ,

    [theme.breakpoints.down('sm')]: {
        marginBottom:15
    }
}))
 


const Cart = () => {
    const { cartItems } = useSelector( state => state.cart ) ;

    const checkoutHandler = async(amount) => {
      
      const {data:{key}} = await axios.get("http://localhost:8000/getkey") ;

      const {data:{order}} = await axios.post("http://localhost:8000/checkout",{
        amount
      })

      var options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Akash Dubey",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:8000/paymentverification",
        prefill: {
            "name": "Akash Dubey", //name of loged in user
            "email": "gaurav.kumar@example.com", //user
            "contact": "9000090000"
        },
       notes: {
            "address": "Razorpay Corporate Office"
        },
       theme: {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
       
    
      
} 

    return (
        <>
          {
            cartItems.length ?
            <Container container>
              <LeftComponent item lg={9} md={9} sm={9} xs={12}>
                <Header>
                    <Typography>My Cart ({cartItems.length})</Typography>
                </Header> 
                {
                    cartItems.map( item => (
                      <>
                        <CartItem item={item} checkoutHandler={checkoutHandler}/>
                       
                      </>
                    ))
                }
                
              </LeftComponent>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                   <TotalView cartItems={cartItems}/>
              </Grid>
            </Container>
            : <EmptyCart/>
          }
        </>
    )
}

export default Cart ;