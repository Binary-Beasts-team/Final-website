import React from 'react'
import "../css/outpassForm.css"

function OutpassForm() {
  return (
    <>
    <div className='outerDivForm'>
        <form className='outpassForm'>
            <span className="outpassFormTitle">OUTPASS FORM</span>

            {/* Pre Filled */}
            <fieldset disabled>
                <div class="mb-3">
                    <label for="disabledTextInput" class="form-label">Name</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Keshav Kumar Jha"/>
                </div>
                <div class="mb-3">
                    <label for="disabledTextInput" class="form-label">Registration No.</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="20bcs070"/>
                </div>
            </fieldset>


            <div className="mb-3">
                <label className="form-label formKey">Date of Leaving</label>
                <input type="date" required className="form-control formInput"/>
            </div>
            <div className="mb-3">
                <label className="form-label formKey">Date of Returning</label>
                <input required type="date" className="form-control formInput"/>
            </div>
            <div className="mb-3">
                <label className="form-label formKey">Reason</label>
                <input required type="text" className="form-control formInput"/>
            </div>
            <div className="mb-3">
                <label className="form-label formKey">Destination</label>
                <input required type="text" className="form-control formInput"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" required className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">I have confirmed the details</label>
            </div>
            <div className='btnContainer'>
                <button type="submit" className="btn btn-primary submitBtn">Submit</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default OutpassForm