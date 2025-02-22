<?php if (!defined('_VALID_BBC')) exit('No direct script access allowed');

if (isset($_POST['submit'])) {
	$msg = [];
	if (!empty($_FILES['file']) && ($_POST['submit'] == 'submit_excel')) {
		$output = _lib('excel')->read($_FILES['file']['tmp_name'])->sheet(1)->fetch();
		unset($output[1]);

		foreach ($output as $key => $value) {
			if (isset($value['B'])) {

				$course_id = $db->getOne("SELECT `id` FROM `school_course` WHERE `name` = '" . $value['B'] . "' ");

				$msg_field = [];
				if (!empty($msg_field)) {
					$fields = implode(', ', $msg_field);
					$msg = msg($fields . '. yang kamu masukan belum ada pada data manapun, tambahakan data di task ' . $fields);
				}

				if (!$course_id) {
					$course_id = $db->Insert('school_course', array(
						'name' => $value['B']
					));

					$msg =  msg('Course berhasil ditambahkan', 'success');
				} else {
					$msg =  msg('Course gagal ditambahkan', 'danger');
				}
			}
		}
	}
}

echo '<div class="col-md-6">';
$form = _lib('pea',  'school_course');
$form->initAdd();
$form->add->setSaveTool(true);

$form->add->addInput('header', 'header');
$form->add->input->header->setTitle('Add Course');

$form->add->addInput('course', 'text');
$form->add->input->course->setTitle('Mata Pelajaran');
$form->add->input->course->setFieldName('name');
$form->add->input->course->setRequire();

$form->add->action();

echo $form->add->getForm();
echo '</div>';

?>
<div class="col-md-6">
	<form method="POST" role="form" enctype="multipart/form-data" onsubmit="return validate_excel()">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Add Course with Excel</h3>
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
									<button type="submit" class="btn btn-primary" name="submit" value="submit_excel">Submit</button>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div class="panel-footer">
				<button type="button" class="btn btn-default" data-toggle="modal" data-target="#preview-excel">Pilih FIle</button>
			</div>
		</div>
	</form>
</div>
<div class="col-md-6">
	<form action="<?php echo site_url('school/course') ?>" method="POST" class="form" role="form">
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
				<button type="submit" name="template" value="download" class="btn btn-default"><?php echo icon('fa-file-excel-o') ?> Download Template</button>
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
	var expectedHeaders = ['No', 'Mapel'];
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