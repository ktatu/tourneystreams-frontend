import { Box } from "@mui/material"

const YoutubeTest = (youtubeApiReady: boolean) => {
    const youtubePlayer = () => {
        if (!youtubeApiReady) {
            return null
        }

        new window.YT.Player("id123123", {
            videoId: "3KCEjA4exQc",
        })
    }

    const videoId = "3KCEjA4exQc"

    return (
        <Box>
            <iframe
                id="id123123"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: 0 }}
            ></iframe>
        </Box>
    )
}
/*
        <Box>
            <iframe
                id="id123123"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ZAMt4NtcLnM?si=0Ro11Zet8DjizMAC"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: 0 }}
            ></iframe>
        </Box>



            <YouTubePlayer
                key={0}
                controls={false}
                height="500px"
                width="750px"
                url={"https://www.youtube.com/watch?v=ZAMt4NtcLnM"}
            />
*/

export default YoutubeTest
