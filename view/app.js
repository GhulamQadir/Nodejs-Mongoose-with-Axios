var email = document.getElementById('email')
var password = document.getElementById('password')


const signin = () => {
   axios.post('http://localhost:4001/auth/signin', {email: email.value, password: password.value})

   .then((success) => {
  console.log(success, "success")
   })
   .catch((err) => {
   console.log(err, "error")
   })
}