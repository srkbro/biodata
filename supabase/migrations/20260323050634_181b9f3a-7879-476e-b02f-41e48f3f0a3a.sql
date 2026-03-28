-- Create messages table for contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public contact form)
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can read messages (admin)
CREATE POLICY "Authenticated users can read messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update (mark as read)
CREATE POLICY "Authenticated users can update messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users can delete messages
CREATE POLICY "Authenticated users can delete messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (true);