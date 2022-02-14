import {StyleSheet} from 'react-native'
import { colors } from './theme'

const {dark,gray,teal} = colors
export const searchStyle = StyleSheet.create({
    searchField:{
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        margin:5,
        color:colors.gray[600],
        flex:1,
        opacity:0.6,
        width:'70%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row'
    },
    searchFieldFocus:{
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        margin:5,
        color:colors.gray[600],
        elevation:5,
        flex:1,
        width:'70%',
        opacity:0.9,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        transform:[{scaleY:1.08}],
        marginVertical:10,
        flexDirection:'row'
    },
    basicInput:{
        marginHorizontal:40,
        color:colors.gray[500]
    },
    searchButton:{
        paddingHorizontal:10,
        paddingVertical:3,
        alignItems:'center',
        justifyContent:'center',
        borderLeftWidth:1,
        borderLeftColor:dark[400]

    },
})