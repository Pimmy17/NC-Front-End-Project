export default function Error({error}) {
    return (
        <section>
            <div>
                {error? `${error.response.status} - ${error.response.data.msg}` : <><h3>
                <strong>404 - Page Not Found</strong> </h3>
                <h5>
                <em>♫ And I still haven't found 
                <br /> the page I'm looking for ♫ </em>
                <br />
                 - Bono(sort of) 
                 
                </h5>
                </>} 
            </div>
        </section>
    )

}