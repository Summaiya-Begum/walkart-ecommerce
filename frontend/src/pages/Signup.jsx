import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from "react-redux"
import { getSignup } from '../Redux/auth/auth.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
function Signup() {
    const dispatch = useDispatch()
    const msg = useSelector((state) => state.user.msg)
    console.log(msg)
    const [showPassword, setShowPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        firstname: '',
        lastname: "",
        email: "",
        password: "",
        phonenumber: "",
        gender: ""
    })

    const notify = () => toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(signupData)
       await dispatch(getSignup(signupData))
        if (msg) {
          await notify()
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setSignupData({
            ...signupData,
            [name]: value,
        })
    }
    // console.log(signupData)
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'lg'} color={'gray.600'}>
                        Create Your Account Here✌️
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input name="firstname" value={signupData.firstname} onChange={handleChange} type="text" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input name="lastname" onChange={handleChange} type="text" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input name="email" onChange={handleChange} type="email" />
                            </FormControl>


                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input name="password" onChange={handleChange} type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <FormControl id="phone" isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input name="phonenumber" onChange={handleChange} type="number" />
                            </FormControl>

                            <FormLabel as='legend'>Select Gender</FormLabel>
                            <RadioGroup defaultValue='male'>
                                <HStack spacing='24px'>
                                    <Radio name="gender" onChange={handleChange} value='male' defaultChecked >Male</Radio>
                                    <Radio name="gender" onChange={handleChange} value='female' >Female</Radio>
                                </HStack>
                            </RadioGroup>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'pink.500',
                                    }}
                                    type="submit"

                                >
                                    Sign up
                                </Button>

                                <ToastContainer
                                    position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="colored"
                                />
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex >
    )
}

export default Signup