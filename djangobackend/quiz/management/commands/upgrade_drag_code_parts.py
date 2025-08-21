# from quiz.models import DragDropQuestion
# from django.core.management.base import BaseCommand
#
# class Command(BaseCommand):
#     help = 'Upgrade DragAndDropQuestion.code_parts from string list to structured [{text, input}] format'
#
#     def handle(self, *args, **kwargs):
#         def is_input_marker(text):
#             return text.strip() == ''
#
#         updated = 0
#         for q in DragDropQuestion.objects.all():
#             try:
#                 if isinstance(q.code_parts, list) and all(isinstance(p, str) for p in q.code_parts):
#                     structured = [
#                         {'text': part, 'input': is_input_marker(part)}
#                         for part in q.code_parts
#                     ]
#                     q.code_parts = structured
#                     q.save()
#                     updated += 1
#                     self.stdout.write(f"✔ Updated drag question ID: {q.id}")
#             except Exception as e:
#                 self.stderr.write(f"✖ Error upgrading drag question ID {q.id}: {e}")
#         self.stdout.write(self.style.SUCCESS(f"Upgrade complete: {updated} drag questions updated."))
