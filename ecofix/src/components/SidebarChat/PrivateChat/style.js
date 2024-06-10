import { styled } from "@stitches/react";



export const StyledMessagesField = styled('div',{
    display:'flex',
    flexDirection:'column',
    height:'100%',
    width:'100%',
    backgroundColor:'rgba(150,200,140)',
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
        maxWidth:'fit-content',
        height:'auto',
        padding:'1vw',
        backgroundColor:'beige',
        borderRadius:'23px',
        fontSize:'13px',
        boxShadow:'2px 2px 10px 0px rgba(0,0,0,0.3)'
    },
    

})




export const StyledInput = styled('div',{

    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'6vh',
    backgroundColor:'green',
    paddingLeft:'2px',
    paddingRight:'2px',
    boxShadow:'0px -1px 10px 0px black',
    
    '.inputBox':{
        backgroundColor:'rgba(100,150,100)',
        borderRadius:'20px',
        border:'1px solid black',
        paddingLeft:'10px',
        paddingRight:'10px',
        height:'80%',
        width:'70%',
        color:'black',
    },
    '.send':{
        display:'flex',
        backgroundColor:'rgba(70,180,100)',
        height:'80%',
        alignItems:'center',
        fontSize:'14px',
        marginLeft:'8px',
        border:'0px',
        color:'black',
    },
    '.send:focus':{
        outline:'none',
    },
    '.send:active':{
        backgroundColor:'rgba(160,200,160)',
    }
})