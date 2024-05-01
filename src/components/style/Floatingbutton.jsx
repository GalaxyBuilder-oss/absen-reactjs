import { btn } from "./style"

const FloatingButton = ({handleClick}) => {

    return (
        <div className="w-auto inline absolute bottom-10 right-8">
            <button className={btn} onClick={handleClick}>
              Print
            </button>
          </div>
    )
}

export default FloatingButton