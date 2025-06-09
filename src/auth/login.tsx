import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StyledButton } from "@/components/button/button-lellall";
import Input from "@/components/input/input";
import { theme } from "@/theme/theme";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useLoginMutation } from '@/redux/api/auth/auth.api';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();

    // Extract ref from query parameters
    const queryParams = new URLSearchParams(location.search);
    const redirectRef = queryParams.get('ref');

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            const result = await login({ ...data, role: "CONSUMER" }).unwrap();
            toast.success('Login successful!');

            // Redirect based on ref parameter or default to /shop
            if (redirectRef === 'cart') {
                navigate('/cart');
            } else if (redirectRef === 'shop') {
                navigate('/shop');
            } else {
                navigate('/shop'); // Default redirect
            }
        } catch (error: any) {
            toast.error('Login failed: ' + (error.data?.message || 'An error occurred'));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold text-green-900">Welcome Back</h1>
                <p className="mt-2 text-sm">Enter your email and password to sign in</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            width="100%"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                            error={errors.email?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            width="100%"
                            label="Password"
                            placeholder="Your password"
                            type="password"
                            error={errors.password?.message}
                            {...field}
                        />
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        variant="link"
                        className="mb-2 text-xs"
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot password?
                    </Button>
                </div>
                <div className="mt-4">
                    <StyledButton
                        background={theme.colors.active}
                        color={theme.colors.secondary}
                        width="100%"
                        variant="outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'SIGN IN'}
                    </StyledButton>
                </div>
                <div className="flex mt-4 justify-center">
                    <Button
                        variant="link"
                        className="mb-2 text-xs"
                        onClick={() => navigate('/register')}
                    >
                        Don't have an account?{' '}
                        <span className="text-green-800 text-[14px]">Sign up</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;