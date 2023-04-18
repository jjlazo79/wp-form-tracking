/**
 * CF7 forms
 */
const currentUrl = window.location.href;
document.addEventListener('wpcf7mailsent', function (event) {

    window.dataLayer = window.dataLayer || [];
    let formId = event.detail.contactFormId;

    window.dataLayer.push({
        event: 'envio_de_formulario_ok',
        enviado: {
            'estado': 'Correcto',
            'URL': currentUrl,
            'formId': formId,
        }
    });

});

/**
 * Elementor forms (by IDs)
 */
const ElementorForm = document.getElementById("incoming_call");
if (ElementorForm !== null) {
    ElementorForm.addEventListener('submit', function (event) {

        window.dataLayer = window.dataLayer || [];
        let ElementorFormId = event.target.id;

        window.dataLayer.push({
            event: 'solicitar_llamada',
            enviado: {
                'estado': 'Correcto',
                'URL': currentUrl,
                'formId': ElementorFormId,
            }
        });
    });
}



/**
 * Phone number clicks (by IDs)
 */
const topheader_phone = document.getElementById("contact_phone_topheader");
if (typeof topheader_phone !== 'undefined') {
    topheader_phone.addEventListener("click", function (e) {
        window.dataLayer.push({
            event: 'llamada',
            llamada: {
                'action': 'llamada',
                'URL': currentUrl,
                'ubicacion': 'topheader',
            }
        });
    }, false);
}

// const cta_phone = document.querySelectorAll(".cta_phone");
// for (let i = 0; i < cta_phone.length; i++) {
//     cta_phone[i].addEventListener("click", function() {
//         window.dataLayer.push({
//             event: 'llamada',
//             llamada: {
//                 'action': 'llamada',
//                 'URL': currentUrl,
//                 'ubicacion': 'CTA',
//             }
//         })
//     });
// }

document.querySelectorAll(".cta_phone").forEach(cta_phone =>
    cta_phone.addEventListener("click", () =>
        window.dataLayer.push({
            event: 'llamada',
            llamada: {
                'action': 'llamada',
                'URL': currentUrl,
                'ubicacion': 'CTA',
            }
        })
    )
);

const footer_phone = document.getElementById("footer_phone");
if (typeof footer_phone !== 'undefined') {
    footer_phone.addEventListener("click", function (e) {
        window.dataLayer.push({
            event: 'llamada',
            llamada: {
                'action': 'llamada',
                'URL': currentUrl,
                'ubicacion': 'footer',
            }
        });
    }, false);
}
