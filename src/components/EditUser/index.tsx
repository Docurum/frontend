import React, { use, useEffect, useState } from 'react'
import { GetUserQuery, editUser } from '../../api/user';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { any, z } from 'zod';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { checkUsernameExists } from '../../api';
import classNames from 'classnames';
import { registerSchemaType } from '../../types/signup';
import { nameSchema, usernameSchema } from '../../schemas';
import { useQueries } from '@tanstack/react-query';
const editUserSchema = z
  .object({
    name: nameSchema,
    username: usernameSchema,
    bio:z.string(),
    phone:z.string(),
    dob:z.string()
  })
  .strict()
  export type editUserSchemaType = z.infer<typeof editUserSchema>;
function Edit() {


    const userQuery = GetUserQuery();
    useEffect(()=>{
     const user = userQuery.data
   setValue("name",user?.name as string )
   setValue("username",user?.username as string )
   setValue("bio",user?.bio as string )
   setValue("phone",user?.phone as string )
    setValue("dob",user?.dob as string )
    },[userQuery.isSuccess])
      const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(false);
    console.log(userQuery.data);
    const router = useRouter();

const checkUsernameExistsHandler = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      await checkUsernameExists({ username: e.target.value });
       clearErrors("username");
      setIsUsernameAvailable(true);
    } catch (err: any) {
      if (err.response) {
        setIsUsernameAvailable(false);
        const errorMessage = err.response.data.message[0] as { message: string; path:any };
        setError(errorMessage.path[0], {
          message: errorMessage.message,
        });
      } else {
        toast.error("Unable to Connect to Server", { id: "server-conn-fail" });
      }
    }
  };


       const {
         reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, },
  } = useForm<editUserSchemaType>({
    mode: "onChange",
    defaultValues: {
      name: userQuery.data?.name,
      bio: userQuery.data?.bio,
      dob: !userQuery.data?.dob ? " ": userQuery.data.dob as string,
      phone: userQuery.data?.phone,
      username: userQuery.data?.username,
      
    },
  });
  const onSubmit : SubmitHandler<z.infer< any>>=  async (formdata: any) => {
   formdata.dob = new Date(formdata.dob)

    try{
  await editUser(formdata)
  toast.success("Profile Updated")
 router.push('/profile')
    }catch(e){
   console.log(e);
   
    }
  }
  return (
 
   <div className={classNames( ["flex flex-col overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])} >
         <div  >
           <h2 className="text-3xl font-bold " >Edit your Profile</h2>
         </div>
          <div className="mt-8 max-w-md">
          <form  onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6 ">
              <label className="block">
                <span className="text-gray-800">Full name</span>
                <input
                   id="name"
                      className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [errors.name ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"])}
                  type="text"
                   {...register("name")}
            
                  placeholder="Enter your name"
                />
              </label>
         <label className="block">
                <span className="text-gray-800">Your Username</span>
               <input
              className={classNames(
                ["rounded w-full py-2 px-3 text-gray-700"],
                [errors.username ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"],
                [isUsernameAvailable && !errors.username && "!border-2 border-green-600 focus:!outline-green-600"]
              )}
              id="username"
              type="text"
              placeholder="Choose your username"
              {...register("username")}
              onChange={checkUsernameExistsHandler}
            />
            {errors.username && <p className="text-red-500 text-sm italic">{errors.username.message}</p>}
            {isUsernameAvailable && !errors.username && <p className="text-green-700 text-sm italic">Username available!</p>}
          
              </label>
        
              <label className="block">
                <span className="text-gray-800">Your DOB</span>
                <input
                  {...register("dob")}
                  type="date"
                  
                     className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [ "border border-gray-300 focus:outline-blue-600"])}
                  placeholder='Enter your DOB'
                />
                
              </label>

              <label className="block">
                <span className="text-gray-800">Your Bio</span>
                <textarea
                   className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [errors.bio ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"])}
                 maxLength={300}
                  {...register("bio")}
                 
                placeholder='Enter your bio '
                ></textarea>
              </label>
             
              <label className="block">
                <span className="text-gray-800">Phone number</span>
         
                <input
                  type="text"
                   {...register("phone")}
                   className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [errors.phone ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"])}
                  placeholder="Enter your phone number"
                />
              </label>
            
              <div>
                <button type="submit"
                          onClick={() => {
                            handleSubmit(onSubmit);
                          }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>

              </div>
            </div>
          </form>
        
          </div>
    </div>

   

  )
}

export default Edit