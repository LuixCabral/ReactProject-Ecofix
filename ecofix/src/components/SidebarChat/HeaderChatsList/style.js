import { styled } from '@stitches/react'

export const StyledSidebarHeader = styled('div', {
        display: 'flex',
        paddingLeft:'20px',
        paddingRight:'20px',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height: '8%',
        backgroundColor: 'white',
        boxShadow: '0 10px 10px -9px rgb(0,0,0,0.2)',
        zIndex:'1',

        '.photo':{
            display:'flex',
            width:'45px',
            height:'45px',
            borderRadius: '50%',
            backgroundColor:'grey',
            border:'3px solid black'
        },

        '.photo:hover':{
            cursor:'pointer'
        },

        '.title':{
            fontSize:'30px'
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
            width:'15px',
            backgroundColor:'white',
            border:'0px',
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
            backgroundColor:'grey',
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
        }
})