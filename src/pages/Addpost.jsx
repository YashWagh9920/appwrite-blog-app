import React from 'react'
import {Container,Postform} from "../components/index"

function Addpost() {
  return (
    <div className='py-8'>
      <Container>
        <h1 className='text-2xl font-bold text-center'>Add New Post</h1>
        <Postform />
        </Container>   
    </div>
  )
}

export default Addpost
