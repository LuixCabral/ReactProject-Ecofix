import { styled } from '@stitches/react'

export const StyledSidebarHeader = styled('div', {
        display: 'flex',
        paddingRight:'20px',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        height: '8%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        boxShadow: '0 10px 10px -9px rgb(0,0,0,0.2)',
        zIndex:'1',
    
        '.boxArrowPhoto':{
            display:'flex',
            alignItems:'center',
            maxHeight:'100%',
            maxWidth:'42%',
            minHeight:'0%',
            minWidth:'0%',
            paddingLeft:'20px'
        },
        '.svg':{
            height:'100%',
            width:'auto',
            minHeight:'0%',
            minWidth:'0%',
        },
        '.photo':{
            display:'flex',
            width:'100%',
            minWidth:'0',
            minHeight:'0',
            height:'45px',
            borderRadius: '50%',
            backgroundColor:'#CBE5C9',
            border:'3px solid black',
        },

        '.photo:hover':{
            cursor:'pointer'
        },

        '.title':{
            fontSize:'1.5em',
            marginBottom:'20px',
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
            backgroundColor:'rgba(0,0,0,0)',
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
            right:'0',
            backgroundColor:'white',
            border:'1px solid grey',
            borderRadius:'10px',
        },
        '.box':{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
        },
        '.boxTop': {
            borderTopRightRadius:'6px',
            borderTopLeftRadius:'6px',
            borderBottom:'1px solid grey'
        },
        '.boxBottom':{
            borderBottomLeftRadius:'6px',
            borderBottomRightRadius:'6px',
        },
        '.box:hover':{
            backgroundColor:'rgb(60, 135, 90, 0.9)',
            textDecoration:'none',
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
            textDecoration:'none',
        },
        '.link:focus':{
            outline:'none',
        },
        '.backToList':{
            width:'60%',
            height:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:'0',
            border:'none',
            

        },
        '.backToList:hover':{
            border:'0px',
        },
        '.backToList:focus':{
            outline:'none'
        }
})