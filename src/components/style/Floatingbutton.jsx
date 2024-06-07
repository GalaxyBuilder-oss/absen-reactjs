import { CopySharp } from "react-ionicons";
import { btn } from "./style"
import PropTypes from "prop-types";

const FloatingButton = ({handleClick}) => {

    return (
        <div className="w-auto inline absolute bottom-8 xl:bottom-20 right-6 xl:right-14">
            <button className={btn} onClick={handleClick}>
              <CopySharp color={'#fff'} />
            </button>
          </div>
    )
}

export default FloatingButton

FloatingButton.propTypes = {
  handleClick : PropTypes.func.isRequired,
}