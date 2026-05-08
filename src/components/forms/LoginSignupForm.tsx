"use client";

import DefaultLayout from "@/layouts/default";
import { tokenLib } from "@/libs/localStorageDb";
import { responseHandler } from "@/libs/responseHandler";
import { makelogin } from "@/redux/AuthSlice";
import { loginService, signupService } from "@/services/authService";
// import {FloppyDisk} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useDispatch } from "react-redux";

export function LoginSignupForm({ type }: { type: "login" | "signup" }) {
  const dispatch = useDispatch();
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data: Record<string, string> = {};

  //   // Convert FormData to plain object
  //   formData.forEach((value, key) => {
  //     data[key] = value.toString();
  //   });

  //   alert("Form submitted successfully!");
  // };

  const login_handler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      // Convert FormData to plain object
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      console.log("login_handler", data);
      const resp: any = await responseHandler(
        loginService,
        { data, id: "", query: "" },
        { toast_display: true },
      );
      console.log(resp);
      if (resp.success) {
        // console.log('success');
        // console.log(resp.data.accessToken);
        tokenLib.setToken(resp.data.accessToken);
        dispatch(makelogin(true));

      }
    } catch (error) {}
  };
  const signup_handler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      // Convert FormData to plain object
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      console.log("signup_handler", data);
      const resp: any = await responseHandler(
        signupService,
        { data, id: "", query: "" },
        { toast_display: true },
      );
      console.log(resp);
      if (resp.success) {
        // localStorage.setItem('token',resp.data.token);
      }
    } catch (error) {}
  };
  return (
    <>
      <DefaultLayout>
        {type == "login" && (
          <div className=" flex justify-center items-center h-96">
            <Form className="w-full max-w-96" onSubmit={login_handler}>
              <Fieldset className=" p-5 capitalize">
                <Fieldset.Legend>{type}</Fieldset.Legend>

                <FieldGroup>
                  <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                  </TextField>
                  <TextField
                    isRequired
                    name="password"
                    validate={(value) => {
                      if (value.length < 3) {
                        return "Name must be at least 3 characters";
                      }

                      return null;
                    }}
                  >
                    <Label>Password</Label>
                    <Input type="password" placeholder="John Doe" />
                    <FieldError />
                  </TextField>

                  <TextField
                    isRequired
                    name="bio"
                    validate={(value) => {
                      if (value.length < 10) {
                        return "Bio must be at least 10 characters";
                      }

                      return null;
                    }}
                  >
                    <FieldError />
                  </TextField>
                </FieldGroup>
                <Fieldset.Actions>
                  <Button type="submit">
                    {/* <FloppyDisk /> */}
                    Save changes
                  </Button>
                  <Button type="reset" variant="secondary">
                    Cancel
                  </Button>
                </Fieldset.Actions>
              </Fieldset>
            </Form>
          </div>
        )}
        {type == "signup" && (
          <div className=" flex justify-center items-center h-96">
            <Form className="w-full max-w-96" onSubmit={signup_handler}>
              <Fieldset className=" p-5 capitalize ">
                <Fieldset.Legend>{type}</Fieldset.Legend>

                <FieldGroup>
                  <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                      if (value.length < 3) {
                        return "Name must be at least 3 characters";
                      }

                      return null;
                    }}
                  >
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                    <FieldError />
                  </TextField>
                      <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                  </TextField>
                  <TextField
                    isRequired
                    name="password"
                    validate={(value) => {
                      if (value.length < 3) {
                        return "Password must be at least 3 characters";
                      }

                      return null;
                    }}
                  >
                    <Label>Password</Label>
                    <Input type="password" />
                    <FieldError />
                  </TextField>
              
                  <TextField
                    isRequired
                    name="bio"
                    validate={(value) => {
                      if (value.length < 10) {
                        return "Bio must be at least 10 characters";
                      }

                      return null;
                    }}
                  >
                    {/* 8340419322 */}
                    <FieldError />
                  </TextField>
                </FieldGroup>
                <Fieldset.Actions>
                  <Button type="submit">
                    {/* <FloppyDisk /> */}
                    Save changes
                  </Button>
                  <Button type="reset" variant="secondary">
                    Cancel
                  </Button>
                </Fieldset.Actions>
              </Fieldset>
            </Form>
          </div>
        )}
      </DefaultLayout>
    </>
  );
}
