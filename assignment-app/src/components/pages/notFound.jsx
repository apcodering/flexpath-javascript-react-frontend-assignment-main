//This component displays a message to the user if the user enters a url other than those specified in the list of Router entries
//in the navbar

export default function NotFound() {
    return (
        <div className="position-relative">
            <div className='col position-fixed top-50 start-50 translate-middle'>
                <p className="text-center">Error: there is no page at this url</p>
                <p className="text-center">Please navigate to a page by selecting one of the links on the navigation bar at the top of this page.</p>
            </div>
        </div>
    )
}