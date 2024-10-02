import "bootstrap/dist/css/bootstrap.min.css";
import bgmobile from './assets/Bgmobile.png';
import bgdesktop from './assets/Bgdesktop.png';
import axios from 'axios';
import Arrowicon from './assets/Arrowicon.svg';
import Locationicon from './assets/Locationicon.svg';
import { useState } from "react";

function Iptracker(){
    const[ipAddress, setIpAddress] = useState("");
    const [ipData, setIpData] = useState({});
    const [error, setError] = useState(null);

    const fetchIpData = async () => {
        try {
          const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
          setIpData(response.data);
          setError(null); // Clear any previous errors
        } catch (error) {
          setError("Invalid IP address or unable to fetch data.");
          setIpData({});
        }
      };

    return (
      <>
      <img className="bg-desktop" src={bgdesktop} alt="bg-desktop" />
        <img
          style={{ width: "100vw" }}
          className="bg-mobile"
          src={bgmobile}
          alt="bgmobile"
        />
        <div className="ip-div">
          <h1 className="mt-5 h1 text-white">IP Address Tracker</h1>

          <input
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="rounded input p-3 mt-2"
            type="text"
          />
          <img
            onClick={fetchIpData}
            className="bg-dark arrow-img"
            src={Arrowicon}
            alt="arrow-icon"
          />

          <div className="result-div rounded bg-white d-flex flex-wrap justify-content-between">
            <div className="mx-2">
            <p className="text-secondary">Ip address</p>
            <p className="ip-address-data">{ipData.ip || "N/A"}</p>
            </div>
            <div>
            <p className="text-secondary">Location</p>
            <p className="ip-address-data">
              {ipData.city} {ipData.region || "N/A"}
            </p>
            </div>
            <div>
            <p className="text-secondary">Timezone</p>
            <p className="ip-address-data">{ipData.timezone || "N/A"}</p>
            </div>
            <div className="mx-2">
            <p className="text-secondary">Isp</p>
            <p className="ip-address-data">{ipData.org || "N/A"}</p>
            </div>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}

          {ipData.latitude && ipData.longitude && (
            <div className="map">
              <iframe
                width="100%"
                height="600"
                frameborder="0"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  ipData.longitude - 0.08
                },${ipData.latitude - 0.08},${ipData.longitude + 0.08},${
                  ipData.latitude + 0.08
                }&layer=mapnik&marker=${ipData.latitude},${ipData.longitude}`}
                allowfullscreen
              ></iframe>
            </div>
          )}
        </div>
      </>
    );
}

export default Iptracker;