<?php if (!defined('_VALID_BBC')) exit('No direct script access allowed');

if (isset($_POST['submit'])) {
    $msg = '';
    if (!empty($_FILES['file'])) {
        $output = _lib('excel')->read($_FILES['file']['tmp_name'])->sheet(1)->fetch();
        unset($output[1]);

        foreach ($output as $key => $value) {
            if (isset($value['B']) && isset($value['C'])) {

                $teacher_id = $db->getOne("SELECT `id` FROM `school_teacher` WHERE `name` = '" . $value['C'] . "'");
                if (!$teacher_id) {
                    $msg = msg('guru yang kamu masukan belum ada pada data guru, tambahakan data di task guru terlebih dahulu');
                }

                if (isset($teacher_id)) {
                    if ($value['B']) {
                        $class_parse = explode(" ", $value['B']);
                        if (count($class_parse) !== 3) {
                            $msg[] = msg('Invalid class name format ex. 10 RPL 1 ex. 10 RPL 1', 'warning');
                        }

                        $grade = $class_parse[0];
                        if (!is_numeric($grade)) {
                            $msg[] = msg('Grade must be an integer');
                        } else {
                            $major = $class_parse[1];
                            $label = $class_parse[2];

                            $class_teacher = $db->getrow("SELECT `id`  FROM `school_class` WHERE `teacher_id`='$teacher_id'");
                            $class_id = $db->getrow("SELECT `id`  FROM `school_class` WHERE `grade` = $grade AND `label` = '$label' AND `major` = '$major' AND `teacher_id` = $teacher_id");

                            if ($class_id) {
                                $msg = msg('Data Class sudah ada di database');
                            }
                            if (!$class_id && !$class_teacher) {
                                $class_id = $db->Insert('school_class', array(
                                    'teacher_id' => $teacher_id,
                                    'grade' => $grade,
                                    'label' => $label,
                                    'major' => $major,
                                ));
                                $msg = msg('Data berhasil ditambah', 'success');
                            }
                            // else {
                            // 	$msg = msg('Data sudah ada di database');
                            // }
                        }
                    }
                }
            }
        }
    }
}

echo '<div class="col-md-6">';
$form = _lib('pea', 'school_class');

$form->initEdit(!empty($_GET['id']) ? 'WHERE id=' . $_GET['id'] : '');
$form->edit->setSaveTool(true);

$form->edit->addInput('header', 'header');
$form->edit->input->header->setTitle('Tambah Kelas');

$form->edit->addInput('grade', 'text');
$form->edit->input->grade->setFieldName('grade');
$form->edit->input->grade->setTitle('Nama Kelas');
$form->edit->input->grade->setRequire($is_input_require = 'number', $is_mandatory = 1);

$form->edit->addInput('label', 'text');
$form->edit->input->label->setFieldName('label');
$form->edit->input->label->setTitle('Divisi Kelas');
$form->edit->input->label->setRequire($is_input_require = 'any', $is_mandatory = 1);

$form->edit->addInput('major', 'text');
$form->edit->input->major->setFieldName('major');
$form->edit->input->major->setTitle('Jurusan (Opsional)');

$form->edit->addInput('teacher', 'selecttable');
$form->edit->input->teacher->setFieldName('teacher_id');
$form->edit->input->teacher->setTitle('Pilih Wali Kelas');
$form->edit->input->teacher->addOption('Pilih Wali Kelas', '');
$form->edit->input->teacher->setReferenceTable('school_teacher');
$form->edit->input->teacher->setReferenceField('name', 'id');
$form->edit->input->teacher->setRequire();

echo $form->edit->getForm();
echo '</div>';

?>
<div class="col-md-6">
    <form method="POST" role="form" enctype="multipart/form-data" onsubmit="return validate_excel()">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Add Class with Excel</h3>
            </div>
            <div class="panel-body">
                <?php if (!empty($msg) && ($_POST['submit'] == 'submit_excel')) echo $msg; ?>
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
                                    <label for="formFile" class="form-label">Pilih file</label>
                                    <input type="file" class="form-control" id="fileInput" name="file">
                                </div>
                                <div id="preview">
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                    <button type="submit" class="btn btn-primary" name="submit" value="submit_excel">
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#preview-excel">Pilih
                    FIle
                </button>
            </div>
        </div>
    </form>
</div>
<div class="col-md-6">
    <form action="<?php echo site_url('school/class') ?>" method="POST" class="form" role="form">
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
                <button type="submit" name="template" value="download"
                        class="btn btn-default"><?php echo icon('fa-file-excel-o') ?> Download Template
                </button>
            </div>
        </div>
    </form>
</div>

<script>
    function validate_excel() {
        var fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files.length === 0) {
            alert("Masukkan file terlebih dahulu");
            return false;
        }
    }
</script>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>

<script>
    var expectedHeaders = ['No', 'Teacher', 'Class'];
    document.getElementById('fileInput').addEventListener('change', function (e) {
        var file = e.target.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
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
                    columns.forEach(function (column) {
                        html += '<th>' + column + '</th>';
                    });

                    html += '</tr></thead><tbody>';

                    // Isi data ke dalam tabel
                    jsonData.forEach(function (row) {
                        html += '<tr>';
                        columns.forEach(function (column) {
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
                return expectedHeaders.every(function (header) {
                    return headers.includes(header.toLowerCase());
                });
            }

        }
    });
</script>