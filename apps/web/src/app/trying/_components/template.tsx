// 'use client'

// import { Input } from "@/components/inputformikblack"
// import { createCashier } from "@/libs/action/user"
// import { createCashierSchema } from "@/libs/schema"
// import { CashierData } from "@/types/user"
// import { Form, Formik } from "formik"
// import { toast } from "react-toastify"
// import PictureModal from "./picturemodal"
// import { useState } from "react"

// export default function EmployeeForm() {
//   const [openModal, setOpenModal] = useState(false);
//   const [dataUrl, setDataUrl] = useState<string | null>(null); 

//   const initialValues: CashierData = {
//     username: '',
//     fullname: '',
//     password: '',
//   }

//   const onCreate = async (data: CashierData, dataUrl: string, resetForm: () => void) => {
//     try {
//       const res = await createCashier(data, dataUrl);
//       toast.success(res.msg);
//       resetForm(); 
//       setDataUrl(null);
//     } catch (error) {
//       toast.error(error as string);
//     }
//   }

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={createCashierSchema}
//         onSubmit={(values, { resetForm }) => {
//           if (dataUrl) {
//             onCreate(values, dataUrl, resetForm);
//           } else {
//             toast.error("Please select an avatar image.");
//           }
//         }}
//       >
//         {() => (
//           <Form>
//             <Input name="username" type="string" placeholder="username" />
//             <Input name="fullname" type="string" placeholder="fullname" />
//             <Input name="password" type="password" placeholder="password" />
//             <button 
//               type="button" 
//               className="bg-coffee p-2 text-white" 
//               onClick={() => setOpenModal(true)}
//             >
//               Portrait
//             </button>
//             <br />
//             <button type="submit" className="p-2 bg-coffee text-white">
//               Submit
//             </button>
//             {openModal && (
//               <PictureModal 
//                 func={(imageDataUrl: string) => {
//                   setDataUrl(imageDataUrl);
//                   setOpenModal(false); 
//                 }} 
//                 closeModal={() => setOpenModal(false)}
//               />
//             )}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }
