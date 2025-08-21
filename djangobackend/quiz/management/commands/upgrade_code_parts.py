#
# from quiz.models import FillInBlankQuestion
# from django.core.management.base import BaseCommand
#
# class Command(BaseCommand):
#     help = 'Upgrade FillInBlankQuestion.code_parts from string list to structured object list'
#
#     def handle(self, *args, **kwargs):
#         def is_input_marker(text):
#             return text.strip() == ''
#
#         updated = 0
#         for q in FillInBlankQuestion.objects.all():
#             try:
#                 if isinstance(q.code_parts, list) and all(isinstance(p, str) for p in q.code_parts):
#                     structured = [
#                         {'text': part, 'input': is_input_marker(part)}
#                         for part in q.code_parts
#                     ]
#                     q.code_parts = structured
#                     q.save()
#                     updated += 1
#                     self.stdout.write(f"✔ Updated question ID: {q.id}")
#             except Exception as e:
#                 self.stderr.write(f"✖ Error upgrading question ID {q.id}: {e}")
#         self.stdout.write(self.style.SUCCESS(f"Upgrade complete: {updated} questions updated."))
