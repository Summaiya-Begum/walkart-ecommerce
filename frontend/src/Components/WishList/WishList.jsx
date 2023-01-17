import { Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import React from 'react'
import WhisListCard from './WhisListCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getData } from '../../Redux/wishlist/wishlist.action'

function WishList() {
    const { wishlistData, msg, isLoading } = useSelector((state) => state.wishlist)
    const {isAuth,token} = useSelector(state => state.user)
    // console.log(wishlistData, msg)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuth)
            dispatch(getData())
    }, [dispatch, wishlistData.length, isAuth, msg])
    return (
        <>
            {
                isLoading ? <Spinner size='xl' />:
                    <Box>
                        <Heading>WishList Items: {isAuth ? wishlistData?.length : 0}</Heading>
                        <SimpleGrid columns={[1, 2, 3]} borderRadius={'3xl'}
                            spacing='10px' p={'1rem'}>
                            {
                                isAuth ?
                                    wishlistData.map((item, i) => {
                                        // console.log(item)
                                        return (
                                            <WhisListCard item={item} key={i} />
                                        )
                                    })
                                    :
                                    ""
                            }
                        </SimpleGrid>
                    </Box>
            }
        </>
    )
}

export default WishList
