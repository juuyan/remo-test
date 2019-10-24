import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ icon, children, disable, highlight }) => {
  const style = disable
    ? 'bg-lighter cursor-default'
    : `${highlight ? 'shadow-base' : ''} bg-white hover:bg-lighter hover:text-black`
  return (
    <button
      className={`#btn px-1 h-2.5 border text-xs text-dark font-semibold leading-none border-light flex items-center trans ${style}`}
      type="button"
    >
      {icon && (
        <div className="mr-0.5">
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div>{children}</div>
    </button>
  )
}

export const Buttons = ({ btns, gap }) => {
  const buttons = btns.map((btn, i) => (
    <div className={`mx-${gap}`} key={i}>
      {btn}
    </div>
  ))
  return <div className={`flex-none -mx-${gap} flex`}>{buttons}</div>
}
