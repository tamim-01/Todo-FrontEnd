
import SigninForm from "../components/signinForm.jsx";
// function signin() {
//   axios({
//     method: "post",
//     url: "http://localhost:3000/api/tasks/signup",
//     data: {
//       username: "user999",
//       password: "jspoi0e0328r4",
//       role: "admin",
//     },
//   });
// }

export function LogInPage () {
    return(<main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <SigninForm />
      </main>)
        
}
