const Footer = (props) => {

    return (
        <footer className="mx-2 bg-green-600 text-white p-4 rounded-b-lg font-light">
        &copy; {props.date.getFullYear()} - All rights reserved
      </footer>
    )
}

export default Footer