<?php if (!defined('_VALID_BBC')) exit('No direct script access allowed'); ?>

<body>
    <div class="col-md-8">
        <form method="post" enctype="multipart/form-data" class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h1 class="panel-title">Tambah Siswa</h1>
                </div>

                <div class="panel-body">
                    <!-- ========================================== -->
                    <!-- START STUDENT -->
                    <!-- ========================================== -->
                    <div class="form-group siswa">
                        <label for="nama_siswa">Nama Siswa :</label>
                        <input type="text" class="form-control" name="nama_siswa" maxlength="255" <?php echo $input_post['nama_siswa'] ?> required>
                    </div>

                    <div class="form-group siswa">
                        <label for="gender_siswa">Gender Siswa :</label>
                        <select class="form-control" name="gender">
                            <option value="1">Laki-Laki</option>
                            <option value="2">Perempuan</option>
                        </select>
                    </div>

                    <div class="form-group siswa">
                        <label for="tanggal_lahir_siswa">Tanggal Lahir :</label>
                        <input type="date" class="form-control"
                            name="tanggal_lahir_siswa" <?php echo $input_post['tanggal_lahir_siswa'] ?> required>
                    </div>

                    <div class="form-group siswa">
                        <label for="nis">NIS :</label>
                        <input type="number" class="form-control" name="nis" maxlength="255" <?php echo $input_post['nis'] ?> required>
                    </div>

                    <div class="form-group siswa">
                        <label for="nis">NISN :</label>
                        <input type="number" class="form-control" name="nisn" maxlength="20" <?php echo $input_post['nisn'] ?> required>
                    </div>

                    <div class="form-group siswa">
                        <label for="nomer_kk">Nomor KK :</label>
                        <input type="number" class="form-control" name="nomer_kk" maxlength="16" <?php echo $input_post['nomer_kk'] ?> required>
                    </div>

                    <div class="form-group siswa">
                        <label for="alamat">Alamat :</label>
                        <input type="text" class="form-control" name="alamat" <?php echo $input_post['alamat'] ?> required>
                    </div>

                    <div class="form-group">
                        <input type="radio" name="MyRadio" value="orang tua" checked> orang tua <br>
                        <input type="radio" name="MyRadio" value="wali"> wali
                    </div>
                    <!-- ========================================== -->
                    <!-- START AYAH -->
                    <!-- ========================================== -->
                    <div class="form-group ayah">
                        <label for="nama_ayah">Nama Ayah :</label>
                        <input type="text" class="form-control" name="nama_ayah" maxlength="255" <?php echo $input_post['nama_ayah'] ?> required>
                    </div>

                    <div class="form-group ayah">
                        <label for="tanggal_lahir_ayah">Tanggal Lahir Ayah :</label>
                        <input type="date" class="form-control"
                            name="tanggal_lahir_ayah" <?php echo $input_post['tanggal_lahir_ayah'] ?>
                            required>
                    </div>

                    <div class="form-group ayah">
                        <label for="profesi_ayah">Profesi Ayah :</label>
                        <input type="text" class="form-control" name="profesi_ayah" maxlength="255" <?php echo $input_post['profesi_ayah'] ?> required>
                    </div>

                    <div class="form-group ayah">
                        <label for="nik_ayah">NIK Ayah :</label>
                        <input type="number" class="form-control" name="nik_ayah" maxlength="16" <?php echo $input_post['nik_ayah'] ?> required>
                    </div>

                    <div class="form-group ayah">
                        <label for="nomer_telepon_ayah">Nomor Telepon Ayah :</label>
                        <input type="text" class="form-control"
                            name="nomer_telepon_ayah" maxlength="14" <?php echo $input_post['nomer_telepon_ayah'] ?>
                            required>
                    </div>

                    <!-- ========================================== -->
                    <!-- START IBU -->
                    <!-- ========================================== -->

                    <div class="form-group ibu">
                        <label for="nama_ibu">Nama Ibu :</label>
                        <input type="text" class="form-control" name="nama_ibu" maxlength="255" <?php echo $input_post['nama_ibu'] ?> required>
                    </div>

                    <div class="form-group ibu">
                        <label for="tanggal_lahir_ibu">Tanggal Lahir Ibu :</label>
                        <input type="date" class="form-control" name="tanggal_lahir_ibu" <?php echo $input_post['tanggal_lahir_ibu'] ?>
                            required>
                    </div>

                    <div class="form-group ibu">
                        <label for="profesi_ibu">Profesi Ibu :</label>
                        <input type="text" class="form-control" name="profesi_ibu" maxlength="255" <?php echo $input_post['profesi_ibu'] ?> required>
                    </div>

                    <div class="form-group ibu">
                        <label for="nik_ibu">NIK Ibu :</label>
                        <input type="number" class="form-control" name="nik_ibu" maxlength="16" <?php echo $input_post['nik_ibu'] ?> required>
                    </div>

                    <div class="form-group ibu">
                        <label for="nomer_telepon_ibu">Nomor Telepon Ibu :</label>
                        <input type="text" class="form-control" name="nomer_telepon_ibu" maxlength="14" <?php echo $input_post['nomer_telepon_ibu'] ?>
                            required>
                    </div>

                    <!-- ========================================== -->
                    <!-- START WALI -->
                    <!-- ========================================== -->

                    <div class="form-group wali">
                        <label for="nama_wali">Nama Wali :</label>
                        <input type="text" class="form-control" name="nama_wali" maxlength="255" <?php echo $input_post['nama_wali'] ?> required>
                    </div>

                    <div class="form-group wali">
                        <label for="tanggal_lahir_wali">Tanggal Lahir wali :</label>
                        <input type="date" class="form-control"
                            name="tanggal_lahir_wali" <?php echo $input_post['tanggal_lahir_wali'] ?>
                            required>
                    </div>

                    <div class="form-group wali">
                        <label for="profesi_ayah">Profesi Wali :</label>
                        <input type="text" class="form-control" name="profesi_wali" maxlength="255" <?php echo $input_post['profesi_wali'] ?> required>
                    </div>

                    <div class="form-group wali">
                        <label for="nik_wali">NIK wali :</label>
                        <input type="number" class="form-control" name="nik_wali" maxlength="16" <?php echo $input_post['nik_wali'] ?> required>
                    </div>

                    <div class="form-group wali">
                        <label for="nomer_kk_wali">Nomor KK wali :</label>
                        <input type="number" class="form-control" name="nomer_kk_wali" maxlength="16" <?php echo $input_post['nomer_kk_wali'] ?>
                            required>
                    </div>

                    <div class="form-group wali">
                        <label for="nomer_telepon_wali">Nomor Telepon wali :</label>
                        <input type="text" class="form-control"
                            name="nomer_telepon_wali" maxlength="14" <?php echo $input_post['nomer_telepon_wali'] ?>
                            required>
                    </div>

                    <div class="form-group wali">
                        <label for="alamat_wali">Alamat wali :</label>
                        <input type="text" class="form-control" name="alamat_wali" <?php echo $input_post['alamat_wali'] ?> required>
                    </div>

                    <div class="form-group">
                        <button type="submit" name="manual" class="btn btn-primary col-md-12">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!-- import data with Excel -->
    <div class="col-md-4">
        <form method="POST" role="form" enctype="multipart/form-data" onsubmit="return validateForm()">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Add Student with Excel</h3>
                </div>
                <div class="panel-body">
                    <?php
                    foreach ($fields as $key => $fieldName) {
                        $label = ucwords(str_replace('_', ' ', $fieldName));
                        echo '<div class="form-group">';
                        // echo '<label for="">' . 'Field ' . $label . '</label>';
                        echo '<input type="hidden" name="' . $fieldName . '" class="form-control input-file" id="" placeholder="Input field" value="' . $key . '">';
                        echo '</div>';
                    }
                    ?>
                    <div class="help-block">
                        Upload File Excel
                    </div>
                    <div class="modal" id="preview-excel" style="background-color: white;">
                        <div class="modal-dialog" style="max-width: 1000px; width: 100%;">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h4 class="modal-title">Preview Excel</h4>
                                </div>

                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="fileInput" class="form-label">Pilih File</label>
                                        <input id="fileInput" name="file" type="file" class="form-control">
                                    </div>
                                    <div id="preview">
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                        <button type="submit" class="btn btn-primary" name="import_excel" value="submit">
                                            Submit
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#preview-excel">Pilih File
                    </button>
                </div>
            </div>
        </form>
        <div class="">
            <form action="" method="POST" class="form" role="form">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Template Excel</h3>
                    </div>
                    <div class="panel-body">
                        <div class="help-block">
                            Unduh Template Excel
                        </div>
                    </div>
                    <div class="panel-footer">
                        <button type="submit" name="template" value="download" class="btn btn-default">
                            <?php echo icon('fa-file-excel-o') ?> Download Template
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <script>
        $(document).ready(function() {
            $(".error-span").show();
            $(".success-span").show();
            $("input[name='MyRadio']").on('change', function() {
                let value = $("input[name='MyRadio']:checked").val();

                // Clear the required attribute for all fields
                $(".form-group input").prop('required', false);

                // Set the required attribute based on the selected value
                if (value == "orang tua") {
                    $(".wali input").prop('required', false);
                    $(".ayah input, .ibu input").prop('required', true);
                    $(".wali").hide();
                    $(".ayah, .ibu").show();
                } else if (value == "wali") {
                    $(".ayah input, .ibu input").prop('required', false);
                    $(".wali input").prop('required', true);
                    $(".wali").show();
                    $(".ayah, .ibu").hide();
                }
            });

            // Set initial state based on the default selected radio button
            let initialValue = $("input[name='MyRadio']:checked").val();
            if (initialValue == "orang tua") {
                $(".wali input").prop('required', false);
                $(".ayah input, .ibu input").prop('required', true);
                $(".wali").hide();
                $(".ayah, .ibu").show();
            } else if (initialValue == "wali") {
                $(".ayah input, .ibu input").prop('required', false);
                $(".wali input").prop('required', true);
                $(".wali").show();
                $(".ayah, .ibu").hide();
            }

            $('input.input-file').on('input', function() {
                var inputValue = $(this).val();
                var uppercaseValue = inputValue.toUpperCase();
                $(this).val(uppercaseValue);
            });

            setTimeout(function() {
                $("#error-span").hide();
            }, 10000);
        });

        var expectedHeaders = [
            'No',
            'Nama Siswa',
            'Tanggal Lahir Siswa',
            'Nis',
            'Nomer KK',
            'Alamat',
            'Nama Ayah',
            'Tanggal Lahir Ayah',
            'Nik Ayah',
            'Nomer Telepon Ayah',
            'Nama Ibu',
            'Tanggal Lahir Ibu',
            'Nik Ibu',
            'Nomer Telepon Ibu',
            'Nama Wali',
            'Tanggal Lahir Wali',
            'Nik Wali',
            'Nomer KK Wali',
            'Nomer Telepon Wali',
            'Alamat Wali'
        ];

        document.getElementById('fileInput').addEventListener('change', function(e) {
            var file = e.target.files[0];

            if (file) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, {
                        type: 'array'
                    });

                    // Ambil data dari sheet pertama
                    var sheetName = workbook.SheetNames[0];
                    var sheet = workbook.Sheets[sheetName];
                    var headers = getHeaders(sheet);

                    var isHeaderValid = checkHeaderValidity(headers);

                    console.log(headers);

                    if (isHeaderValid) {

                        // Convert data sheet ke array of objects
                        var jsonData = XLSX.utils.sheet_to_json(sheet);
                        console.log(jsonData);

                        // Tampilin preview dalam bentuk tabel di div dengan id 'preview'
                        var html = '<div class="table-responsive"><table class="table table-bordered"><thead><tr>';

                        // Ambil nama kolom
                        var columns = Object.keys(jsonData[0]);
                        columns.forEach(function(column) {
                            html += '<th>' + column + '</th>';
                        });

                        html += '</tr></thead><tbody>';

                        // Isi data ke dalam tabel
                        jsonData.forEach(function(row) {
                            html += '<tr>';
                            columns.forEach(function(column) {
                                html += '<td>' + row[column] + '</td>';
                            });
                            html += '</tr>';
                        });

                        html += '</tbody></table>';
                        // Tampilin tabel di div dengan id 'preview' dengan tambahan border
                        document.getElementById('preview').innerHTML = html;
                    } else {
                        document.getElementById('preview').innerHTML = '<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" title="ok sign"></span> Maaf, format excel yang anda upload tidak sesuai, Silahkan donwload template yang sudah di sediakan.</div>';
                    }
                };

                reader.readAsArrayBuffer(file);

                function getHeaders(sheet) {
                    var headers = [];
                    var range = XLSX.utils.decode_range(sheet['!ref']);
                    var C;

                    for (C = range.s.c; C <= range.e.c; ++C) {
                        var cell = sheet[XLSX.utils.encode_cell({
                            r: range.s.r,
                            c: C
                        })];
                        var header = cell.v;
                        headers.push(header.toLowerCase()); // Mengonversi header ke huruf kecil
                    }

                    return headers;
                }

                function checkHeaderValidity(headers) {
                    return expectedHeaders.every(function(header) {
                        return headers.includes(header.toLowerCase());
                    });
                }

            }
        });
    </script>
</body>