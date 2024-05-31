import { btn } from "./style"
import PropTypes from "prop-types";

const FloatingButton = ({handleClick}) => {

    return (
        <div className="w-auto inline absolute bottom-10 xl:bottom-20 right-8 xl:right-14">
            <button className={btn} onClick={handleClick}>
              Salin
            </button>
          </div>
    )
}

export default FloatingButton

FloatingButton.propTypes = {
  handleClick : PropTypes.func.isRequired,
}