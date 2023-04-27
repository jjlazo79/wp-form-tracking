document.addEventListener('DOMContentLoaded', function () {
    let currentUrl = window.location.href;
    /**
     * CF7 forms
     */
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


    /**
     * Menu links
     */
    document.querySelectorAll('#header-main-menu a').forEach(el => {
        el.addEventListener('click', function () {
            var menuSelected = this.innerText;
            var url = new URL(this.getAttribute("href"));
            var pathSelected = url.pathname.split('/').slice(1, -1).toString();

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'menu_header_selection',
                menuheader: {
                    'page': currentUrl,
                    'selection': pathSelected,
                    'category': menuSelected
                }
            });
            console.log('Nombre del elemento clicado: ' + menuSelected);
            console.log('Ruta seleccionada:' + pathSelected);
        });
    });


    /**
     * Blog
     */
    // View_Item_List
    var blogItems = [];
    document.querySelectorAll('.page-id-34800 .elementor-post').forEach(el => {
        var postTitle = el.innerText;
        // Get post ID
        var css = el.getAttribute("class");
        var postID = css.replace(/\D/g, '');
        blogItems.push(
            {
                item_name: postTitle,
                item_id: postID,
                price: 0,
                item_brand: "Vilarovira",
                index: 1,
                quantity: 1
            }
        );
    });
    console.log(blogItems);


     if (!blogItems.length === 0) { 
        dataLayer.push({ ecommerce: null });
        dataLayer.push({
            event: "view_item_list",
            ecommerce: {
                items: blogItems
            }
        });
    }


    // Select_Item 
    document.querySelectorAll('.page-id-34800 .elementor-post').forEach(el => {
        el.addEventListener('click', function () {
            var postTitle = this.innerText;

            // Get post ID
            var css = this.getAttribute("class");
            var postID = css.replace(/\D/g, '');

            dataLayer.push({ ecommerce: null });
            dataLayer.push({
                event: "select_item",
                ecommerce: {
                    items: [{
                        item_name: postTitle,
                        item_id: postID
                    }]
                }
            });

            console.log('Nombre del post clicado: ' + postTitle);
            console.log('ID del post clicado: ' + postID);
        });
    });

}, false);
