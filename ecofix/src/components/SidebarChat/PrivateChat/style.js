import { keyframes, styled } from "@stitches/react";



export const StyledMessagesField = styled('div',{
    display:'flex',
    flexDirection:'column',
    height:'100%',
    width:'100%',
    backgroundColor:'#7FD99D',
    padding:'2vw',
    overflow:'hidden',
    overflowY:'auto',
    gap:'1vh',
    

    '&::-webkit-scrollbar':{
        width:'1vw',
    },
    '&::-webkit-scrollbar-thumb':{
        backgroundColor:'rgba(100,150,100)',
        height:'auto',
        borderRadius:'30px',
        minHeight:'2vh',
        maxHeight:'1vh',
    },

    '.userName':{
        fontSize:'17px',
    },
    '.msg':{
        width:'100%',
        wordWrap:'break-word',
        textAlign:'left',
    },
    '.msgBox':{
        display:'flex',
        flexWrap:'wrap',
        minWidth:'70%',
        maxWidth:'100%',
        height:'auto',
        padding:'1vw',
        backgroundColor:'beige',
        borderRadius:'23px',
        fontSize:'13px',
        boxShadow:'2px 2px 10px 0px rgba(0,0,0,0.3)',
        gap:'1vh',
    },
    

})

const rotate = keyframes({
    '0%':{transform:'rotate(30deg)'},
    '100%':{transform:'rotate(360deg)'}
})


export const StyledInput = styled('div',{

    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'8vh',
    backgroundColor:'whitesmoke',
    paddingLeft:'2px',
    paddingRight:'2px',
    boxShadow:'0px -1px 10px 0px black',
    
    '.inputBox':{
        backgroundColor:'white',
        borderRadius:'20px',
        border:'1px solid black',
        paddingLeft:'10px',
        paddingRight:'10px',
        height:'60%',
        width:'70%',
        color:'black',
        boxShadow:'none',
    },
    '.inputBox::placeholder':{
        color:'rgb(0,0,0,0.5)'
    },
    '.send':{
        display:'flex',
        backgroundColor:'#2AA377',
        height:'60%',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'14px',
        marginLeft:'20px',
        border:'0px',
        color:'black',
    },
    '.send:focus':{
        outline:'none',
    },
    '.send:active':{
        backgroundColor:'rgba(160,200,160)',
    },
    '.imgSend':{
        transform:'rotate(30deg)'
    },
    '.imgSend:hover':{
        animation:`${rotate} 0.25s linear`,
    }

    
})



export const StyledChatClosed = styled('div', {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'8vh',
    backgroundColor:'#297b45',
    paddingLeft:'2px',
    paddingRight:'2px',
    boxShadow:'0px -1px 10px 0px black',
    fontSize:'19px',
})


