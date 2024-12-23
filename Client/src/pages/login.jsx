import { useState, useEffect } from "react";
import DefaultLayout from "../layouts/default";
import { Button, Input, Checkbox, Link, Form, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "../components/icons";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.username.value !== "" && e.target.password.value !== "") {
            auth.loginAction(e.target.username.value, e.target.password.value);
            return;
        }
        alert("Pleae provide a valid input");
    }

    useEffect(() => {
        if (auth.token) {
            navigate("/dashboard");
        }
    }, [auth.token]);

    return (
        <DefaultLayout>
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
                    <div className="flex flex-col items-center pb-6">
                        <AcmeIcon size={60} />
                        <p className="text-xl font-medium">Welcome Back</p>
                        <p className="text-small text-default-500">Log in to your account to continue</p>
                    </div>
                    <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
                        <Input
                            isRequired
                            label="Username"
                            name="username"
                            placeholder="Enter your username"
                            type="text"
                            variant="bordered"
                        />
                        {auth.loginError && (
                            <p className="text-red-500 text-xs">Invalid username or password</p>
                        )}
                        <Input
                            isRequired
                            endContent={
                                <button type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-closed-linear"
                                    />
                                    ) : (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-bold"
                                    />
                                    )}
                                </button>
                            }
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                        />
                        {auth.loginError && (
                            <p className="text-red-500 text-xs">Invalid username or password</p>
                        )}
                        <div className="flex w-full items-center justify-between px-1 py-2">
                            <Checkbox name="remember" size="sm">
                                Remember me
                            </Checkbox>
                            <Link className="text-default-500" href="#" size="sm">
                                Forgot password?
                            </Link>
                        </div>
                        <Button className="w-full" color="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                    <div className="flex items-center gap-4 py-2">
                        <Divider className="flex-1" />
                        <p className="shrink-0 text-tiny text-default-500">OR</p>
                        <Divider className="flex-1" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            startContent={<Icon icon="flat-color-icons:google" width={24} />}
                            variant="bordered"
                        >
                            Continue with Google
                        </Button>
                        <Button
                            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                            variant="bordered"
                        >
                            Continue with Github
                        </Button>
                    </div>
                    <p className="text-center text-small">
                        Need to create an account?&nbsp;
                        <Link href="#" size="sm">
                            Sign Up
                        </Link>
                    </p>
                    <p className="text-center text-small">
                        You cannot sign up at the moment. Please use the test account:
                        <br />
                        <b>Username:</b> TestAccount
                        <br />
                        <b>Password:</b> {"XGXpL~B{-SU-0BSChu|^"}
                    </p>
                </div>
            </div>
        </DefaultLayout>
  );
}
