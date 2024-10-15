import logo from "../../assets/images/logo.png";
import {
  storeInfo,
  companyInfo,
  socialMediaLinks,
  customersServices,
} from "../../data/footerLinks";
import PaymentsCardsIcons from "../../utils/PaymentsCardsIcons";

export default function Footer() {
  // automatically generate all links
  function generateLink(array: { name: string; url: string }[], title: string) {
    return (
      <div>
        <h1 className="font-brandTitle text-2xl font-semibold mb-4">{title}</h1>
        <ul className="min-w-[190px] w-1/5 flex flex-col gap-3">
          {array.map((obj) => (
            <li
              key={obj.name}
              className="w-fit cursor-pointer hover:text-rose-700 border-black hover:border-s-8 hover:ps-2 hover:font-semibold transition-all duration-300 rounded-s-lg box-border"
            >
              <a className="font-base" href={obj.url} target="_blank">
                {obj.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // automatically generate logo and all social media icons
  function generateSocialMediaLinks(
    array: { name: string; url: string; iconUrl: string }[]
  ) {
    return (
      <div className="min-w-[190px] w-1/5 flex gap-6 flex-col">
        <div className="w-24 h-16 rounded-3xl">
          <img
            className="w-24 h-16 rounded-3xl"
            src={logo}
            alt="clothing-logo"
          />
        </div>
        <div className="flex gap-5">
          {array.map((link) => (
            <div key={link.name}>
              <a href={link.url} target="_blank">
                <i
                  className={`fa-brands ${link.iconUrl} text-4xl cursor-pointer hover:scale-150 hover:text-rose-700 transition-all duration-500`}
                ></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // automatically generate info - address, phone number, email address
  function generateContactInfo(array: { name: string; text: string }[]) {
    return (
      <div>
        <h1 className="font-brandTitle text-2xl font-semibold mb-4">
          Store Info
        </h1>
        <ul className="min-w-[190px] w-1/5 flex flex-col gap-3">
          {array.map((item) => (
            <li className="font-base" key={item.name}>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center bg-[#FECA5A] p-8">
        <div className="flex flex-wrap max-[730px]:justify-center justify-start gap-12">
          {/* Store Info column */}
          {generateContactInfo(storeInfo)}
          {/* Customer Services column */}
          {generateLink(customersServices, "Customer Services")}
          {/* company column */}
          {generateLink(companyInfo, "Company")}
          {/* logo & social media icons */}
          {generateSocialMediaLinks(socialMediaLinks)}
        </div>
      </div>
      <PaymentsCardsIcons />
    </div>
  );
}
