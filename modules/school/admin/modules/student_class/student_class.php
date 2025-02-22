<?php if (!defined('_VALID_BBC')) exit('No direct script access allowed');

$show_list = true;
if (!empty($_GET['id']) && !empty($_GET['act'])) {
  $id = intval($_GET['id']);
  switch ($_GET['act']) {
    case 'approve':
      include 'approval_withdraw-' . $_GET['act'] . '.php';
      break;
  }
  if (!empty($_GET['is_ajax'])) {
    die();
  } else {
    $sys->nav_add('Event ' . ucwords($_GET['act']));
    $show_list = false;
  }
}

if (!empty($_POST['template'])) {
  if ($_POST['template'] == 'download') {
    $r = array(
      array(
        'Nama Siswa' => '',
        'Class'      => '',
        'Number'     => '',
      )
    );
    if (!empty($r)) {
      _func('download');
      download_excel('Template ' . date('Y-m-d') . ' ' . rand(0, 999), $r);
    } else {
      echo msg('Maaf, tidak ada file yg bisa di download', 'danger');
    }
  }
}

if ($show_list) {

  $form = _lib('pea', 'school_student_class');
  $form->initSearch();

  $form->search->addInput('publish', 'select');
  $form->search->input->publish->addOption('All Status', '');
  $form->search->input->publish->addOption('Published', '1');
  $form->search->input->publish->addOption('Not Published', '0');
?>
  <a href="<?php echo site_url('school/student_class_add') ?>">
    <button type="button" class="btn btn-info" style="margin: 0px 0px 20px 10px ">Tambahkan kelas Siswa</button>
  </a>
<?php
  $form->search->addInput('keyword', 'keyword');
  $form->search->input->keyword->addSearchField('student_id, class_id, number', false); //true = fulltext in database field

  $add_sql = $form->search->action();
  $keyword = $form->search->keyword();
  echo $form->search->getForm();

  $form->initRoll("$add_sql ORDER BY `id` ASC", 'id');
  $form->roll->setSaveTool(false);

  $form->roll->addInput('id', 'sqlplaintext');
  $form->roll->input->id->setTitle('id');
  $form->roll->input->id->setDisplayColumn(true);

  $form->roll->addInput('class_id', 'selecttable');
  $form->roll->input->class_id->setTitle('class');
  $form->roll->input->class_id->setFieldName('class_id');
  $form->roll->input->class_id->setReferenceTable('school_class');
  $form->roll->input->class_id->setReferenceField('CONCAT_WS(" ",`grade`, `major`, `label`)', 'id');
  $form->roll->input->class_id->setPlaintext(true);
  $form->roll->input->class_id->setDisplayColumn(true);
  $form->roll->input->class_id->textTip = '';

  $form->roll->addInput('student_id', 'selecttable');
  $form->roll->input->student_id->setTitle('student name');
  $form->roll->input->student_id->setFieldName('student_id');
  $form->roll->input->student_id->setReferenceTable('school_student');
  $form->roll->input->student_id->setReferenceField('name', 'id');
  $form->roll->input->student_id->setPlaintext(true);
  $form->roll->input->student_id->setDisplayColumn(true);
  $form->roll->input->student_id->textTip = '';

  $form->roll->addInput('number', 'sqlplaintext');
  $form->roll->input->number->setTitle('attendance number');
  $form->roll->input->number->setPlainText(true);

  $form->roll->action();
  echo $form->roll->getForm();
}

?>