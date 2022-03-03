import {
    CloseSquare
} from "react-iconly";

const pages = [
    {
        header: "PAGES",
    },
    {
        id: "errors",
        title: "Error Pages",
        icon: <CloseSquare set="curved" className="remix-icon" />,
        children: [
            {
                id: "error-404",
                title: "404",
                navLink: "/pages/error-404",
            },
        ],
    },

];

export default pages