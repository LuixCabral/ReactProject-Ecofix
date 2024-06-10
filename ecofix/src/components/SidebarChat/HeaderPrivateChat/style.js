import {styled} from '@stitches/react';


export const StyledHeaderPC = styled('div', {
    backgroundColor:'green',
    height:'8vh',
    display:'flex',
    width:'100%',
    gap:'0.1vw',
    alignItems:'center',
    boxShadow: '0px 1px 10px 0px black',
    paddingRight:'1vw',
    zIndex:'1',

    '.photo':{
            display:'flex',
            width:'2.3vw',
            height:'70%',
            borderRadius: '50%',
            backgroundColor:'grey',
            border:'3px solid black',
            marginRight:'1vw'
        },

        '.photo:hover':{
            cursor:'pointer'
        },

        '.title':{
            fontSize:'18px',
            width:'50%',
        },
        '.options:hover':{
            cursor:'pointer'
        },
        '.menu':{
            position:'relative',
        },
        '.buttonMenu':{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:'40px',
            width:'45px',
            backgroundColor:'green',
            border:'0px',
            marginLeft:'3.2vw',
        },
        '.dropdown':{
            display:'flex',
            width:'10vw',
            padding:'0px',
            alignItemns:'center',
            justifyContent:'center',
            position:'absolute',
            top:'100%',
            right:'0',
            backgroundColor:'white',
            border:'1px solid grey',
            borderBottom:'0px',
            borderRadius:'10px',
            boxShadow:'0px 2px 5px rgba(2,3,1,0.7)'
        },
        '#boxLinks':{
            display:'flex',
            margin:'0px',
            padding:'0',
            width:'100%',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
        },
        '.box':{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            borderBottom:'1px solid grey',
            padding:'0px',
        },
        '.boxTop': {
            borderTopRightRadius:'6px',
            borderTopLeftRadius:'6px',
        },
        '.boxBottom':{
            borderBottomLeftRadius:'6px',
            borderBottomRightRadius:'6px',
        },
        '.box:hover':{
            backgroundColor:'green',
        },
        '.link':{
            color:'rgba(2,0,3,0.7)',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            backgroundColor:'rgba(0,0,0,0)',
            border: '0px',
        },
        '.link:hover':{
            border:'0px',
        },
        '.link:focus':{
            outline:'none',
        },
        '.backToList':{
            width:'14%',
            height:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'green',
            borderRadius:'0',
            border:'none'

        },
        '.backToList:hover':{
            border:'0px',
        },
        '.backToList:focus':{
            outline:'none'
        }

})