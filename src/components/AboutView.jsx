import WindowFixed from "./style/WindowFixed"
import { btnMenu } from "./style/style"

const AboutView = ({handleClick}) => {

    return (
        <WindowFixed>
            <div className="absolute right-0 m-6">
              <button className={btnMenu} onClick={handleClick}>
                Close
              </button>
            </div>
            <h1 className="mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase">
              About
            </h1>
            <div className="mx-4 px-4 h-[450px] bg-green-600">
              <div className="bg-gray-50 h-full rounded-xl">
                Ini Bagian Isi Dari About
              </div>
            </div>
            <div className="mx-4 p-4 bg-green-600 rounded-b-xl">ini footer</div>
          </WindowFixed>
    )
}

export default AboutView