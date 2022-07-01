import React from 'react'
import './progressBar.css'

const progressBar = () => {
  return (
    <>
    <section>
    <div class="progress">
  <div class="circle done">
    <span class="label">1</span>
    <span class="title">Create Request</span>
  </div>
  <span class="bar done"></span>
  <div class="circle active">
    <span class="label">2</span>
    <span class="title">Confirm & Send</span>
  </div>
  <span class="bar"></span>
  <div class="circle">
    <span class="label">3</span>
    <span class="title">Mentor Approved</span>
  </div>
</div>
    </section>
    </>
  )
}

export default progressBar