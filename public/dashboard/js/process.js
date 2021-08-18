$(document).ready(function(){
    // register user
        $('#reg_cfxi').click(function(event){
            event.preventDefault();
    // ajax call
  		$.ajax({
  			url		: 	'private/core/reg_usr',
  			type	:   'POST',
  			data	:  	$('form').serialize(),
  			success	: function(data) {
  				$("#_err_").html(data);
  			}
  		});
	});
	
	// register user
		$('#vef_pin').click(function(event){
			event.preventDefault();
	// ajax call
		$.ajax({
			url		: 	'private/core/vef_usr',
			type	:   'POST',
			data	:  	$('form').serialize(),
			success	: function(data) {
				$("#vef_err_").html(data);
			}
		});
	});

	// login  user
	$('#cfxi-log').click(function(event){
		event.preventDefault();
		// ajax call
			$.ajax({
				url		: 	'private/core/log_srpt',
				type	:   'POST',
				data	:  	$('form').serialize(),
				success	: function(data) {
					$("#log-error").html(data);
					if(data == "<div class='alert alert-success'>Success!</div>") {
						//redirect
						window.location.href = "trader/";
					}
				}
			})
		})

		// fund account
	$('#pay-bill').click(function(event){
        event.preventDefault();
        // ajax call
            $.ajax({
                url		: 	'private/core/fund_wl',
                type	:   'POST',
                data	:  	$('form').serialize(),
                success	: function(data) {
                    $("#fund-err").html(data);
                    if (data == "sendMail()") {
                        setTimeout(function(){
                            //redirect
                            window.location.href = "fund";
                        }, 1000);
                    }
                }
            })
		})
		// fund account
	$('#cash_out').click(function(event){
        event.preventDefault();
        // ajax call
            $.ajax({
                url		: 	'private/core/with_draw_f',
                type	:   'POST',
                data	:  	$('form').serialize(),
                success	: function(data) {
                    $("#with-err").html(data);
                    if (data == "sendMail()") {
                        setTimeout(function(){
                            //redirect
                            window.location.href = "fund";
                        }, 1000);
                    }
                }
            });
		});

			
		// sell portfolio
        $('#add_btc').click(function(event){
            event.preventDefault();
            // ajax call
                $.ajax({
                    url		: 	'private/core/update_inf',
                    type	:   'POST',
                    data	:  	$('form').serialize(),
                    success	: function(data) {
                        $("#add_b").html(data);
                        if (data == "<div class='alert alert-success pfx-opacity'><i class='fa fa-check text-default'></i> Bitcoin address added successfully.</div>") {
                            setTimeout(function(){
                                //redirect
                                window.location.href = "settings";
                            }, 1000);
                        }
                    }

                })
            })
})