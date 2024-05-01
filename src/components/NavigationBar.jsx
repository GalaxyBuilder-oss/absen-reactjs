import { btnMenu } from "./style/style"

const NavigationBar = ({onShowAdd, onShowAbout}) => {

    return (
        <nav className="flex justify-between align-middle mt-4 mx-4 bg-green-600 p-4 rounded-t-lg text-white">
        <div className="font-bold text-3xl uppercase animate-skew-anim">
          ASRAMA IKHWAN
        </div>
        <div className="flex align-middle gap-4">
          <button onClick={onShowAdd} className={btnMenu}>
            Add
          </button>
          <button onClick={onShowAbout} className={btnMenu}>
            About
          </button>
        </div>
      </nav>
    )
}

export default NavigationBar