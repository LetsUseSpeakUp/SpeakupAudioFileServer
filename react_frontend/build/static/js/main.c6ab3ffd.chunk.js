(this.webpackJsonpspeakupwebfrontend=this.webpackJsonpspeakupwebfrontend||[]).push([[0],{192:function(e,o,t){"use strict";t.r(o);var n=t(0),i=t.n(n),a=t(71),r=t.n(a),s=(t(80),t(38)),c=(t(81),t(72)),h=t.n(c),l=t(74),d=t(1),u=t(73),p=t.n(u),y=t(4);function m(){var e=Object(d.f)().search,o=e.slice(-(e.length-1)),t=i.a.useState(!1),n=Object(s.a)(t,2),a=n[0],r=n[1];if(a)return Object(y.jsx)("h1",{children:"Unable to load snippet"});try{var c="https://letsusespeakup.com/backend/open/snippets?val="+new URLSearchParams(o).get("val");return Object(y.jsx)(h.a,{src:c,autoPlay:!0,controls:!0,loop:!0,controlsList:"nodownload",onError:function(e){console.log("Error: ",e),r(!0)}})}catch(l){return console.log("ERROR: ",l),r(!0),Object(y.jsx)("h1",{children:"Unable to load snippet"})}}function f(){var e=Object(n.useState)("A snippet from SpeakUp"),o=Object(s.a)(e,2),t=o[0],i=o[1],a=Object(d.f)().search;try{var r=a.slice(-(a.length-1)),c=new URLSearchParams(r).get("val");fetch("https://letsusespeakup.com/backend/open/snippets/snippetdescription?val="+c).then((function(e){return e.json()})).then((function(e){var o=e.description;o&&i(o)})).catch((function(e){console.log("ERROR -- FetchedDescription: ",e)}))}catch(h){console.log("ERROR -- FetchedDescription: ",h)}return Object(y.jsx)("h2",{children:t})}var v=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsx)("header",{className:"App-header",children:Object(y.jsx)(l.a,{children:Object(y.jsxs)(d.c,{children:[Object(y.jsxs)(d.a,{exact:!0,path:"/",children:[Object(y.jsx)(m,{}),Object(y.jsx)(f,{})]}),Object(y.jsx)(d.a,{path:"/privacy",children:Object(y.jsx)(p.a,{children:"**Privacy Policy**\n\nFaraz Abidi built the Speakup app as a Free app. This SERVICE is provided by Faraz Abidi at no cost and is intended for use as is.\n\nThis page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.\n\nIf you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.\n\nThe terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Speakup unless otherwise defined in this Privacy Policy.\n\n**Information Collection and Use**\n\nFor a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to phone number, conversation audio, contacts. The information that I request will be retained on your device and is not collected by me in any way.\n\nThe app does use third party services that may collect information used to identify you.\n\nLink to privacy policy of third party service providers used by the app\n\n*   [Google Play Services](https://www.google.com/policies/privacy/)\n\n**Log Data**\n\nI want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (\u201cIP\u201d) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.\n\n**Cookies**\n\nCookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.\n\nThis Service does not use these \u201ccookies\u201d explicitly. However, the app may use third party code and libraries that use \u201ccookies\u201d to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.\n\n**Service Providers**\n\nI may employ third-party companies and individuals due to the following reasons:\n\n*   To facilitate our Service;\n*   To provide the Service on our behalf;\n*   To perform Service-related services; or\n*   To assist us in analyzing how our Service is used.\n\nI want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.\n\n**Security**\n\nI value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.\n\n**Links to Other Sites**\n\nThis Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.\n\n**Children\u2019s Privacy**\n\nThese Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13 years of age. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.\n\n**Changes to This Privacy Policy**\n\nI may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.\n\nThis policy is effective as of 2021-06-19\n\n**Contact Us**\n\nIf you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at faraz.abidi@gmail.com."})})]})})})})};r.a.render(Object(y.jsx)(i.a.StrictMode,{children:Object(y.jsx)(v,{})}),document.getElementById("root"))},80:function(e,o,t){},81:function(e,o,t){}},[[192,1,2]]]);
//# sourceMappingURL=main.c6ab3ffd.chunk.js.map