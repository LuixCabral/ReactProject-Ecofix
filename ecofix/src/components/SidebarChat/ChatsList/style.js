import {styled} from '@stitches/react'


export const StyledChats = styled('div', {
    display:'flex',
    flexDirection:'column',
    backgroundColor:'rgb(254,253,249,0.9)',
    width:'100%',
    height:'85%',

    '.chat':{
        display:'flex',
        alignItems:'center',
        borderBottom:'1px solid black',
        width:'100%',
        height:'9vh',
    },
    '.chat:hover':{
        backgroundColor:'rgb(60, 135, 90, 0.9)',  
        cursor:'pointer',
    },
    '.photo':{
        backgroundColor:'#CBE5C9',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        border:'3px solid green',
        marginLeft:'2vw'
    },
    '.contactName':{
        width:'50%',
        overflow:'hidden',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis',
        marginLeft:'2.3vw'
    }
})


export const StyledRedirect = styled('div',{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgb(254,253,249,0.9)',
    width:'100%',
    height:'85%',
})